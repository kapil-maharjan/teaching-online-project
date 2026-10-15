import photoOne from "../../assets/gallery/photo-one.avif";
import photoTwo from "../../assets/gallery/photo-two.avif";
import photoThree from "../../assets/gallery/photo-three.avif";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import "./HomePage.css";
import { useState, useEffect } from "react";

export function HomePage() {
  const [index, setIndex] = useState(0);
  const photos = [photoOne, photoTwo, photoThree];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => {
        // If we are at the last (cloned) slide, reset immediately to the real first slide
        if (prev === photos.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [photos.length]);

  return (
    <>
      <title>Home</title>
      <link rel="icon" type="image/png" href="/home-favicon.png" />
      <Header />

      <div id="gallery">
        <div id="slides" style={{ transform: `translateX(-${index * 100}%)` }}>
          {photos.map((src, i) => (
            <div className="slide" key={i}>
              <img className="front-image" src={src} alt={`Slide ${i}`} />
            </div>
          ))}
        </div>
      </div>

      <section id="center">
        <div className="hero"></div>
        <div>
          <h1>เรียนรู้วิชาผ่านออนไลน์</h1>
          <p className="para-intro">
            แฟรนไชส์แอดมิสชัน อพาร์ทเมนท์ลิสต์ฟีเวอร์เซ็นทรัล
            ไบเบิลติงต๊องคาปูชิโนอินดอร์พุทธศตวรรษ ไฟลท์ติ๋ม
            สเตอริโอแฟนตาซีพาร์ทเนอร์จังโก้ซิตี้ ไฮเทคสเตชั่นบิลอุปนายก โจ๋ไนท์
            ชัวร์ ไมเกรนไอซียูสโตน แอปเปิล ไชน่าฟรังก์ซีนีเพล็กซ์
            ลิมูซีนไงอัลตราเอาท์ดอร์มอบตัว ซาร์คาเฟ่รีไทร์
            เนิร์สเซอรี่ฮิตแฮปปี้คอนโดทอร์นาโด ดยุกสเก็ตช์
            โกเต็กซ์หน่อมแน้มจิ๊กซอว์ บลอนด์เนิร์สเซอรีเพียบแปร้ ตี๋สเตย์วอล์ก
            แป๋ว วินหน่อมแน้มรุมบ้าดีพาร์ทเมนต์ไฮเปอร์ เยอร์บีร่าชีสเนอะ
            โบรชัวร์แมกกาซีน แพนงเชิญแรลลี่แฮมเบอร์เกอร์แคนยอนซิม รีโมท ซากุระ
            ซังเต โบตั๋นภูมิทัศน์ โง่เขลา เคลียร์ฟรุตเนิร์สเซอรี
            ภูมิทัศน์บราแช่แข็งรามเทพงั้น แจ๊สเป่ายิงฉุบ
            ซีอีโอบอดี้เซอร์วิสนายแบบ เธคดีไซน์ เอ๋เบนโลโปรเจคท์สแล็ก
            โพสต์โลชั่นศิลปากรพาวเวอร์สไตรค์ โนวาฟีโรโมนพัลซาร์อะลูมินา
            เอ็กซ์โพเนนเชียล ไฮโดรลิก มองโกลแกนีมีดฮินดีซิริอุส
            ออกเทนเซ็กเตอร์ฟีโรโมนโวลต์คุรุมุขี กัศมีรีอะมิโนออโรร่า
            แอนดรอยด์โพลิเมอร์ไฮโดรลิกไฟเบอร์เคอราติน พอลิเมอร์สเปิร์มมลยาฬัม
            อัลคาไลน์คุรุมุขี แอนดรอยด์สเต็มซิงค์อูรดู
            เวก้ายูริกโพลิเมอร์ไฮดรอกไซด์ กัณณาฑเทฟลอน ไดออกไซด์บอแรกซ์
            ธาลัสซีเมียออกเทนครอสซิงค์ ไดนามิคแอนดรอยด์ทามิฟลูกัณณาฑ
            อูรดูไฮโดรลิกเมตริกซ์เตลุคู
          </p>
        </div>
      </section>

      <div id="btn-subjects">
        <button type="button" className="btn-cloud">
          <span>วิชาคณิตศาสตร์</span>
        </button>
        <button type="button" className="btn-cloud">
          วิชาวิทยาศาสตร์
        </button>
        <button type="button" className="btn-cloud">
          วิชาภาษาอังกฤษ
        </button>
        <button type="button" className="btn-cloud">
          วิชาภาษาจีน
        </button>
        <button type="button" className="btn-cloud">
          วิชาภาษาญี่ปุ่น
        </button>
        <button type="button" className="btn-cloud">
          วิชาคอมพิวเตอร์
        </button>
      </div>

      <Footer />
    </>
  );
}
