import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-transparent flex flex-col md:flex-row justify-between items-center p-8 md:p-16 sticky">
            {/* Contact Section */}
            <div className='flex flex-col justify-center text-white text-center md:text-left mb-8 md:mb-0 w-full md:w-1/3'>
                <a className="text-xl mb-2" href="" target="_blank"><b>Contact</b></a>
                <p><strong>Adresa: </strong>Str......, ex , ex, 000</p>
                <p><strong>Email: </strong>example2@gmail.com</p>
            </div>

            {/* Social Media Section */}
            <div className='flex flex-col justify-center items-center text-white mb-8 md:mb-0 w-full md:w-1/3'>
                <a className="text-xl mb-2" href=""><b>Despre noi</b></a>
                <p className="text-center">Urmăriți-ne pe platformele de socializare.</p>
                <div className="flex gap-5 text-2xl mt-2">
                    <a href="" target="_blank"><FaInstagram className="icon1" /></a>
                    <a href="" target="_blank"><FaFacebook className="icon2" /></a>
                </div>
            </div>

            {/* Copyright Section */}
            <div className='text-white text-center w-full md:w-1/3'>
                <p>&copy; {new Date().getFullYear()} RaduArdelean</p>
            </div>
        </footer>
    );
}

export default Footer;