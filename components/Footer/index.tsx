
export default function Footer() {
    return (
        <footer>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <img src="/images/logo2.svg" />
                        <img src="/images/logo1.svg" />
                    </div>
                    <div className="col-md-4 inner-text">
                        <a href="#">Inicio</a>
                        <a href="/aboutus">Sobre nosotros</a>
                    </div>
                    <div className="col-md-4 inner-text">
                        <a href="/contact">Contáctanos</a>
                        <a href="/privacyPolicy">Políticas de privacidad</a>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                a {
                    font-size: 2rem;
                    margin-bottom: 1em;
                }

                footer {
                    overflow-x: hidden;
                    margin-top: 2em;
                    width: 98vw;
                    background-color: white;
                }

                footer a{
                    display: block;
                    color:black;
                    font-weight: bold;
                }
                footer .inner-text{
                    padding-top: 80px;
                }
            `}
            </style>
        </footer>
    )
}