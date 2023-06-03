const sendReply = async (reply: Replies, feedbackId: number, commentId: number) => {
    const res = await fetch(`/api/replies/${feedbackId}/${commentId}`, {
      method: 'POST',
      body: JSON.stringify(reply),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  
    const reply: Replies = {
      content: enteredReply,
      replyingTo: replyingTo,
      user: {
        image: "/assets/user-images/image-zena.jpg",
        name: "Zena Kelley",
        username: "velvetround"
      }
    };
  
    const updatedComment = comments.map((comment, id) => {
      if (comment.id === id) {
        return {
          ...comment,
          replies: [...comment.replies, reply],
          showReply: false,
        };
      }
      return comment;
    });
  
    setComment(updatedComment);
    sendReply(reply, feedbackId, comment.id);
  };
    