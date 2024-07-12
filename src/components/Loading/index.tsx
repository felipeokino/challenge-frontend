type LoadingProps = {
  size?: "tiny" | "small" | "medium" | "large" | "extraLarge";
};
const Loading = ({ size }: LoadingProps) => {
  return (
    <div
      data-size={size}
      className="animate-spin rounded-full h-32 w-32 border-2 border-b-0 border-white data-[size=tiny]:size-6 data-[size=small]:size-12 data-[size=medium]:size-24 data-[size=large]:size-36 data-[size=extraLarge]:size-48"
    ></div>
  );
};

export default Loading;
