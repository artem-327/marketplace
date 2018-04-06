import React from 'react';
import Form from './Form'

const FormPlace = props => {
    return <div className="form-place" id="ScrollForm">
        <div className="landing-wr">
            <h1>DOMLUVTE SI S NÁMI SCHŮZKU</h1>
            <p>Těší nás, že máte o AppyMarco zájem. Moc rádi se s vámi potkáme a probereme všechny výhody aplikace a
                detaily naší další spolupráce. Napište nám prosím pomocí kontaktního formuláře, nebo rovnou zavolejte na
                uvedené telefonní číslo.</p>
            <div className="left">
                <Form {...props}/>
            </div>
            <div className="right">
                <div className="form-info">
                    <h2 className="tel"><a href="tel:+420 776 371 143">+420 776 371 143</a></h2>
                    <h2 className="mail"><a href="mailto:info@appymarco.cz" target="_top">info@appymarco.cz</a></h2>
                </div>
            </div>
            <div className="clearfix"> </div>
        </div>
    </div>;
};

export default FormPlace;