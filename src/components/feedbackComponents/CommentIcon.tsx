import { Comments } from "@/models/feedback";
import Image from "next/image";
import { useRouter } from "next/router";
import TotalLength from "./TotalLength";

const CommentIcon: React.FC<{
  comments:Comments[];
  id:number;
}> = ({ comments, id}) => {

    const router = useRouter();

    const clickHandler = () => {
        router.push(`/${id}`);
      };

  return (
    <>
      <div onClick={clickHandler} className="inline-flex cursor-pointer">
        {" "}
        <Image
          src={"/assets/shared/icon-comments.svg"}
          width={18}
          height={16}
          style={{ objectFit: "contain" }}
          alt="comments"
        />
       <TotalLength comments={comments} />
      </div>
    </>
  );
};

export default CommentIcon;
