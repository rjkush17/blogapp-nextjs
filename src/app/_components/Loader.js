import Image from "next/image";
import preloader from "/public/loader/loader.gif"

function Loader() {
  return (
    <section className="flex flex-col justify-center items-center w-screen h-[100vh] mobile:max-h-96 bg-white cursor-wait">
      <Image 
       src={preloader}
       alt="preloader"
       width={180}
       height={180}
       priority={true}
       className="w-44 h-auto"
      />
    </section>
  );
}

export default Loader;
