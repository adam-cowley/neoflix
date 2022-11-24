export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="footer__content">
                            <div className="footer__links">
                                <a href="https://neo4j.com/privacy-policy/" target="_blank">Privacy policy</a>
                                <a href="https://neo4j.com/terms/" target="_blank">Terms and conditions</a>
                            </div>
                            <small className="footer__copyright">&copy; {new Date().getFullYear()}
                                {' '}
                                <a href="https://graphacademy.neo4j.com" target="_blank">Neo4j GraphAcademy</a>.</small>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
