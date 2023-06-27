const UserName: React.FC<{ userName: string }> = ({ userName }) => {
  return (
    <>
      <div className="text-[13px] text-custom-gray md:text-[14px]">
        @{userName}
      </div>
    </>
  );
};

export default UserName;
