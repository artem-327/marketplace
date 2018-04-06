import React, {Component} from 'react';

import Option from './Option'

class Options extends Component {

    createOptionList() {

        let opt = [
            {
                id: 1,
                imgAlt: "Kompletní nabídka",
                imgUrl: "/img/static/landingPage/landingPageOptions/offer.png",
                title: "Obsahuje kompletní nabídku zájezdů s vyhledávačem",
                text: "Mobilní aplikace obsahuje kompletní nabídku zájezdů od různých cestovních kanceláří i s přehledným vyhledávačem, přes který lze zájezd jednoduše vyhledat."
            },
            {
                id: 2,
                imgAlt: "Zaměřená na věrnost",
                imgUrl: "/img/static/landingPage/landingPageOptions/fidelity.png",
                title: "Je silně zaměřená na věrnost a opakované nákupy",
                text: "Mobilní aplikace se po přihlášení klienta “nabranduje” na partnerskou CK, v rámci které byl daný zájezd zakoupen."
            },
            {
                id: 3,
                imgAlt: "Online rezervace",
                imgUrl: "/img/static/landingPage/landingPageOptions/online.png",
                title: "Umožňuje přímé online rezervace ze systému",
                text: "Z dat partnerské CK je možné ihned ověřit aktuální dostupnost termínu a ihned termín zarezervovat. Cílem je maximální automatizace systému bez zásahu partnerské CK."
            },
            {
                id: 4,
                imgAlt: "Online platby",
                imgUrl: "/img/static/landingPage/landingPageOptions/payment.png",
                title: "Disponuje online platební bránou",
                text: "K dispozici je možnost online platby prostřednictvím platební brány formou převodu mezi účty nebo platební kartou."
            },
            {
                id: 5,
                imgAlt: "Automatická faktura",
                imgUrl: "/img/static/landingPage/landingPageOptions/invoice.png",
                title: "Automaticky fakturuje provize za prodané zájezdy",
                text: "Systém automaticky fakturuje provize za prodané zájezdy partnerským CK."
            },
            {
                id: 6,
                imgAlt: "Možnost administrace",
                imgUrl: "/img/static/landingPage/landingPageOptions/administration.png",
                title: "Nabízí možnost administrace zájezdů a jejich účastníků",
                text: "V partnerské sekci se nachází přehled nad všemi zájezdy a informace o jejich účastnících. Veškeré údaje je možné editovat ve webové administraci."
            },
            {
                id: 7,
                imgAlt: "Offline informace",
                imgUrl: "/img/static/landingPage/landingPageOptions/offline.png",
                title: "Poskytuje zákazníkům offline informace o zájezdu",
                text: "Dovolenou budou mít Vaši klienti na dosah ruky, doslova v kapse. Kompletní informace o zájezdu, důležité kontakty, itinerář, tipy na zajímavé lokality, aktuální kurzy i počasí."
            },
            {
                id: 8,
                imgAlt: "Automatická upozornění",
                imgUrl: "/img/static/landingPage/landingPageOptions/alert.png",
                title: "Zasílá automatická upozornění a reklamní notifikace.\n",
                text: "Náš systém automaticky zasílá upozornění jednotlivých stavů rezervace zájezdu. CK bude mít možnost odesílat push notifikace klientům prao komunikaci akcí, nových zájezdů, připomenutí, apod. "
            },
            {
                id: 9,
                imgAlt: "Doplňkové služby",
                imgUrl: "/img/static/landingPage/landingPageOptions/supplement.png",
                title: "Je propojená s dalšími doplňkovými službami.",
                text: "Prostřednictvím mobilní aplikace nabízíme klientům doplňkové služby jako recenze a tipy dané destinace, nejlepší stravování, půjčení auta a další podobné služby."
            },
            {
                id: 10,
                imgAlt: "Marketingové aktivity",
                imgUrl: "/img/static/landingPage/landingPageOptions/marketing.png",
                title: "Rozšiřuje prostor pro marketingové aktivity",
                text: "Motivujte uživatele AppyMarco s Vaším zájezdem například soutěžemi a oni budou sdílet zážitky z dovolené s odkazem na vaši cestovní kancelář na svých sociálních sítích."
            },
        ]

        return opt.map((option) => {
            return (
                <Option key={option.id} imgAlt={option.imgAlt} imgUrl={option.imgUrl} title={option.title}
                        text={option.text}/>
            )
        })
    }


    render() {
        return (
            <div className="options" id="ScrollOptions">
                <div className="landing-wr">
                    {this.createOptionList()}
                </div>
                <div className="clearfix"> </div>
            </div>
        );
    }
}


export default Options