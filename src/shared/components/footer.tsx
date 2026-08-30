import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="flex flex-col items-center justify-center w-full py-20 mt-10 border-t border-white/20 text-white/70">
        <Link href={"/"}>
          <Image src={'/logo-hafilm.png'} width={300} height={200} alt="hafilm" />
        </Link>
        <p className="mt-4 text-center">We do not host, store, or distribute any media files. All content is automatically sourced from third-party providers on the internet.</p>
      </footer>
    </>
  );
};

export default Footer
