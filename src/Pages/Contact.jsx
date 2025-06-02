import React from 'react';
import LowerFooter from '../Components/LowerFooter';
import './Contact.css';
const Contact = () => {
  const clinic_data = [
    {
      id: 1,
      c_day: 'Lunes',
      c_time: '08:00 AM-7:00 PM',
    },
    {
      id: 2,
      c_day: 'Martes',
      c_time: '08:00 AM-7:00 PM'
    },
    {
      id: 3,
      c_day: 'Miercoles',
      c_time: '08:00 AM-7:00 PM',
    },
    {
      id: 4,
      c_day: 'Jueves',
      c_time: '08:00 AM-7:00 PM',
    },
    {
      id: 5,
      c_day: 'Viernes',
      c_time: '08:00 AM-7:00 PM',
    },
    {
      id: 6,
      c_day: 'Sábado',
      c_time: '08:00 AM-7:00 PM',
    },

  ];
  return (
    <>
      <div className="contact_section_container" id="contact-us">
        <div className="container_container">
          <div className="google_map_location">
            <div className="gmap">
              <iframe
                title="gmap_location"
                class="gmap_iframe"
                width="100%"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1351.329066057928!2d73.03084553864231!3d18.97784631919385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3d1c70aaf85%3A0x28a4cd68182e4f7e!2sOm%20Dental%20Clinic!5e1!3m2!1sen!2sin!4v1686294084196!5m2!1sen!2sin"
              ></iframe>
            </div>
          </div>
          <div className="basic_contact_user_form">
            <div className="clinic_time_table">
              <h2 style={{ fontFamily: 'Poppins' }}>
                <span>
                  <i className="fa-solid fa-angles-right"></i>
                </span>
                Horarios de Apertura
              </h2>
            </div>
            <hr />
            {clinic_data.map((e, index) => (
              <div className="clinic_timing" key={index}>
                <p className="current_day">{e.c_day}</p>
                <p className="current_day_timing">{e.c_time}</p>
              </div>
            ))}
            <div className="d_and_c">
              <div className="direction_to_clinic">
                <a
                  href="https://www.google.com/maps?ll=18.978293,73.030934&z=14&t=m&hl=en&gl=US&mapclient=embed&cid=2928691504663646078"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DIRECCIÓN DE LA CLÍNICA
                </a>
              </div>
              <div className="call_to_clinic">
                <a href="tel:9892729909">LLÁMANOS</a>
              </div>
            </div>
          </div>
        </div>
        <LowerFooter />

        <div className="copyright_footer">
          <p>
            <span>
              <i className="fa-regular fa-copyright"></i>
            </span>
            2025 
            <a href="/" id="clinic_name">
              Emeral Dent.
            </a>
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </>
  );
};

export default Contact;
