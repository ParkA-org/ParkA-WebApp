import Head from "next/head"
import Navbar from "components/Navbar"
import Footer from "components/Footer"

function Header() {
  return (
    <div id="header">
      <div className="container">
        <div className="row">
          <div className="col-md-9 inner-text">
            <h1>Buscar y alquilar parqueos</h1>
            <p style={{ marginTop: "0.5em" }}>Nunca fue tan</p>
            <p><span className="h2" style={{ color: "#084C7C" }}>Fácil</span> <span className="h2" style={{ color: "#077187" }}>Rápido</span> <span className="h2" style={{ color: "#59BCA7" }}>Seguro</span></p>
          </div>
          <div className="col-md-3">
            <section>
              <div>
                <button className="btn"><img src="/images/botonParqueo.svg" /></button>
                <button className="text-button">Ofrecer Parqueo</button>
              </div>
              <div>
                <button className="btn"><img src="/images/botonCarro.svg" /></button>
                <button className="text-button">Explorar Parqueos</button>
              </div>
            </section>
          </div>
        </div>
      </div>
      <style jsx>{`
      
      .containerLayout a{
        color:unset !important;
      }

      h1, p {
        color: white;
      }
      h1 {
        font-size: 4rem;
        font-weight: bold;
        width: 30vw;
      }
      p {
        font-weight: bold;
        font-size: 1.5rem;
      }
      span {
        font-size: 2.5rem;
      }

      section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        width: auto;
        height: 80%;
        width: 100%;
        padding: 1em;
      }

      section > div {
        text-align: center;
        margin: 0 auto;
      }

    #header  {
      background-image: url("../images/headerBackground.png");
      background-size: cover;
      background-repeat: no-repeat;
      width: 100%;
    }

    #header button{
        border:none;
        margin: 0;
        padding: 0;
        background-color: none;
    }

    .btn {
      width: 150px;
      height: 150px;
    }
    #header .text-button{
        color: #fff;
        background-color: #3d907f;
        border: none;
        width: max-content;
        border-radius: 1.2em;
        padding: 0.5em 1em;
        display: inline-block;
        font-size: 1.2rem;
    }
    
    #header .text-button:hover{
        background-color: #037185;
        cursor: pointer;
        filter: drop-shadow(4px 4px 4px hsla(0deg, 0%, 0%, 0.5));
    }
    
    #header .inner-text {
        padding-top: 70px;
        padding-bottom: 380px;
    }
  `}</style>
    </div>
  )
}

function Services() {
  return (
    <div id="services">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-3 text-center inner-text">
            <img src="/images/imageMap.svg" />
            <h3>Busca parqueo</h3>
            <p>Localiza el parqueo más cercano a tu destino dentro del mapa de la aplicación al mejor precio</p>
          </div>
          <div className="col-md-4 text-center inner-text">
            <img src="/images/imageCalendar.svg" />
            <h3>Reserva</h3>
            <p>Verifica la disponibilidad de los posibles parqueos alrededor de la zona</p>
          </div>
          <div className="col-md-3 text-center inner-text">
            <img src="/images/imageCar.svg" />
            <h3>Llega a la cita</h3>
            <p>Dirigete al parqueo en la hora establecida y confia que tu vehiculo se encuentra en un lugar seguro</p>
          </div>
        </div>
      </div>
      <style jsx>
        {`
        #services{
          background-image: url("../images/services-svg.svg");
          background-size: cover;
          background-repeat: no-repeat;
          width: 100%;
        }
        
        img {
          width: 160px;
          height: 160px;
          margin-bottom: 1em;
        }

        #services .inner-text{
            color:white;
            padding-top: 90px;
            padding-bottom: 120px;
        }
        `}
      </style>
    </div>
  )
}

function Benefits() {
  return (
    <div id="benefits">
      <div id="benefits-1">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center">
              <img src="/images/money.svg" style={{ width: "40%" }} />
            </div>
            <div className="col-md-6 inner-text">
              <h3>Gana dinero extra</h3>
              <p>Si tienes un espacio disponible registrate como alquilador y disfruta de un ingreso extra mensual.</p>
            </div>
          </div>
        </div>
      </div>
      <div id="benefits-2">
        <div className="container">
          <div className="row">
            <div className="col-md-6 inner-text">
              <h3>Sencilla y disponible en todos lados</h3>
              <p>Utiliza la aplicación disponible tanto en Web, iOS y Android encontrando parqueo sin importar el sistema que utilices.</p>
            </div>
            <div className="col-md-6 text-center">
              <img src="/images/computer.svg" />
            </div>
          </div>
        </div>
      </div>
      <div id="benefits-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center">
              <img src="/images/secureCar.svg" />
            </div>
            <div className="col-md-6 inner-text">
              <h3>Mantén tu vehículo seguro</h3>
              <p>Utiliza un parqueo seguro en donde no te debas preocupar por robos o daños a tu vehículo mientras lo parqueas lejos de casa</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
         #benefits-1{
          background-image: url("../images/benefits1.png");
          background-size: 266px 366px;
          background-repeat: no-repeat;
          background-position: right center;
          width: 100%;
          padding-top: 50px;
          padding-bottom: 100px;
      }
      
      .inner-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
      }

      .inner-text > h3 {
        font-size: 2rem;
        font-weight: bold;
      }

      .inner-text > p {
        font-size: 1.4rem;
      }
      
      #benefits-2{
          background-image: url("../images/benefits2.png");
          background-size: 318px 388px;
          background-position: left center;
          background-repeat: no-repeat;
          width: 100%;
          padding-top: 50px;
          padding-bottom: 100px;
      }
      
      #benefits-3{
          background-image: url("../images/benefits3.png");
          background-size: 368px 468px;
          background-position: right center;
          background-repeat: no-repeat;
          width: 100%;
          padding-top: 50px;
          padding-bottom: 100px;
      }
      
        `}</style>
    </div>
  )
}

function Download() {
  return (
    <div id="download">
      <div className="container">
        <div className="row">
          <h3>Registrate Ya!</h3>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-md-2 col-sm-6">
            <button type="button" className="btn">
              Empezar
          </button>
          </div>
          <div className="col-md-2 col-sm-6">
            <button type="button" className="btn">
              <img src="/images/android.svg" />
            Android
          </button>
          </div>
          <div className="col-md-2 col-sm-6">
            <button type="button" className="btn">
              <img src="/images/apple.svg" />
            iOS
          </button>
          </div>
        </div>
      </div>
      <style jsx>
        {`
        h3 {
          font-size: 3.5rem;
          color: white;
          font-weight: bold;
        }
          #download{
            background-image: url("../images/download.svg");
            background-size: cover;
            background-repeat: no-repeat;
            width: 100%;
            padding-top: 50px;
            padding-bottom: 60px;
        }
        
        #download .row{
            margin: 10px;
        }
        
        #download button{
            background-color: #63C7B2;
            border-radius: 0.7em;
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 75px;
            margin: 7px;
            font-size: 1.5rem;
            font-weight: bold;
        }
        
        #download button img{
            width: 45px;
            height: 45px;
        }
        `}</style>
    </div>
  )
}

export default function Home(): JSX.Element {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossOrigin="anonymous" />
      <div className="landing">
        <div className="containerLayout">
          <Head>
            <title>Index</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Navbar />
        </div>
        <Header />
        <Services />
        <Benefits />
        <Download />
        <Footer />
      </div>
      <style jsx>{`
            .containerLayout {
              overflow-x: hidden;
              display: flex;
              margin: 0 auto;
              flex-direction: column;
              justify-content: flex-start;
              align-items: center;
            }
            .landing {
              overflow-x: hidden;
            }
          `}</style>
    </div>
  )
}