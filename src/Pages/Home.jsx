import React from "react";
import "./Home.css";
import "font-awesome/css/font-awesome.min.css";
import slider_one from "../Pages/images/slide_one.png";
import { HashLink } from "react-router-hash-link";
import ConvaiWidget from "./ConvaiWidget"; // Asegúrate que la ruta es correcta


const Home = () => {
  return (
    <>
      <section id="home">
        <div className="slider_container">
          <div className="slider-images">
            <div className="slider_image">
              <img
                className="w-100"
                src={slider_one}
                alt="First slide"
                data-aos="fade-down"
              />
            </div>

            <div className="front_container">
              <div className="front_page_info">
                <h2
                  style={{
                    fontSize: "51px",
                    margin: "0",
                    textAlign: "left",
                    lineHeight: "1.2",
                    color: "hsl(218, 70%, 18%);",
                  }}
                >
                  Nos preocupamos por tu sonrisa
                </h2>
                <p>
                  Creemos que todos deberían tener acceso fácil a una excelente clínica dental.
                </p>
                <div className="social_links"></div>
              </div>
              <div className="slider_controls">
                <div className="circle_dot_class">
                  <span></span>
                </div>
                <div className="circle_dot_class">
                  <span></span>
                </div>
                <div className="circle_dot_class">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="clinic_container">
          <div className="clinic_info">
            <div className="basic_info" id="info_01">
              <h2>Horario flexible</h2>
              <p>
                Trabajamos en días festivos, además de trabajar hasta tarde en días regulares. En caso de emergencias, aceptamos reservas.
              </p>

              <HashLink
                to={"/register"}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <div className="transperent_btn"> Chatea con un doctor.</div>
              </HashLink>
            </div>
            <div className="basic_info" id="info_02">
              <h2>Garantía del mejor precio.</h2>
              <p>
                Nuestros precios razonables han hecho sonreír a miles de personas con una sonrisa nueva, hermosa e irresistible, 
                como nunca antes.
              </p>
              <HashLink
                to={"/#contact-us"}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <div className="transperent_btn">Leer más</div>
              </HashLink>
            </div>
            <div className="basic_info" id="info_03">
              <h2>Horario de atención.</h2>
              <p>
               Lunes a sábado: 8:00 a. m. – 7:00 p. m.

              </p>

              <HashLink
                to={"/dental-clinic/slot"}
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <div className="transperent_btn" id="tr_btn_01">
                 Reserva una cita.
                </div>
              </HashLink>
            </div>
             <ConvaiWidget />
          </div>
        </div>
        <div>
        </div>
      </section>
    </>
  );
};

export default Home;
