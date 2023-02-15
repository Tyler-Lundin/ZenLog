type Props = {
  openNav: () => void;
  closeNav: () => void;
};

const BTN = "absolute top-4 right-4";
const H2 =
  "text-md font-bold tracking-widest uppercase text-center text-white bg-black p-2 rounded-md shadow-md hover:shadow-none hover:bg-white hover:text-black transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:skew-x-6 hover:skew-y-6 hover:rotate-6";

const OpenNavButton = ({ openNav, closeNav }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openNav();
  };

  return (
    <button onClick={handleClick} className={BTN}>
      <h2 className={H2}>MENU</h2>
    </button>
  );
};

export default OpenNavButton;
