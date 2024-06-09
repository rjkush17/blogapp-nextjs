import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaSkype } from "react-icons/fa";

function Footer() {
  return (
    <footer className="mt-12 bg-black text-zinc-400 pt-16 tablet:pt-36 text-lg font-noto">
    <div className="flex flex-wrap gap-6 w-11/12 mx-auto flex-col tablet:flex-row leading-7 tablet:leading-10 text-center">
    <div className="flex-auto min-w-44">
        <p>FaceBook</p>
        <p>youtube</p>
        <p>Instagram</p>
      
      </div>
      <div className="flex-auto min-w-44">
        <p>About</p>
        <p>Blog</p>
        <p>Policy</p>
        <p>Term</p>
        <p>Contact</p>
      </div>
      <div className="flex-auto min-w-44">
        <p>About</p>
        <p>Blog</p>
        <p>Policy</p>
        <p>Term</p>
        <p>Contact</p>
      </div>
      <div className="flex-auto min-w-44">
        <p>CONTACT@YOURCOMPANY.COM</p>
        <p>15Th Street Avenue, New York, USA</p>
        <p>011-554-8798-6556</p>
        <div className="flex text-3xl gap-6 mt-4 w-fit mx-auto">
          <FaFacebookSquare className="hover:text-white" />
          <FaTwitter  className="hover:text-white"/>
          <FaInstagram className="hover:text-white"/>
          <FaSkype className="hover:text-white"/>
        </div>
      </div>
    </div>
    <div className="text-center py-6">
    <a href="https://rishabhkushwah.netlify.app/" className="underline"> Made by RISHABH KUSHWAH</a>
    </div>
    </footer>
  );
}

export default Footer;
