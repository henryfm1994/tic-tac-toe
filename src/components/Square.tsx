const Square = ({
  children,
  isSelected,
  updateBoard,
  index,
}: {
  children: any;
  isSelected: boolean;
  updateBoard: any;
  index: any;
}) => {
  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div
      className={isSelected ? "square is-selected" : "square"}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Square;
