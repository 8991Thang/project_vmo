export const TitlePage = ({ content }) => {
  return (
    <div>
      <h1 className="font-extrabold sm:text-2xl text-4xl tracking-wide uppercase">{content}</h1>
      <p className="sm:hidden text-gray-600 pt-4">Show the : {content} page</p>
    </div>
  );
};
