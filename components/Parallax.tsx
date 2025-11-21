export default function Parallax({
  image,
  children,
}: {
  image: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="section relative">
      <div
        className="
          w-full
          h-[320px] sm:h-[380px] md:h-[460px]
          bg-cover bg-center bg-no-repeat
          lg:bg-fixed
        "
        style={{ backgroundImage: `url(${image})` }}
      />
      {children && (
        <div className="container-narrow mt-8 px-4 mx-auto">
          {children}
        </div>
      )}
    </section>
  );
}
