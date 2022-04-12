// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Qad from 'App/Models/Qad'
import Qsetting from 'App/Models/Qsetting'
import Application from '@ioc:Adonis/Core/Application'
export default class MonitsController {
    public async index({ view }) {
        let ires = [];
        const lSound = [];
        let setAds = {}
        let aBack = {}
        let aLogo = {}
        const appSetting = await Qsetting.all()
        appSetting.forEach(el => {
            el['$original'].id == "CADS" ? setAds = el['$original'] : null;
            el['$original'].id == "ABG" ? aBack = el['$original'] : null;
            el['$original'].id == "ALOGO" ? aLogo = el['$original'] : null;
        })
        if (setAds.val == "MDIA") {
            ires = await Qad.query().where('stat', 1).where('type', setAds.val).limit(1)
        } else {
            ires = await Qad.query().where('stat', 1).where('type', setAds.val)
        }
        const dt = [
            {
                id: "01",
                q: "001",
                c: "01"
            }
        ]
        /// Create Laos sound 
        for (let i = 0; i <= 13; i++) {
            lSound.push({
                number: (i.toString()).padStart(2, '0')
                lang: 'LA'
            })
        }
        return view.render('monitor', {
            itCalled: dt,
            itAds: ires,
            sound: lSound,
            itBack: aBack,
            apLogo: aLogo
        })


    }

    public async indexAds() {
        const rsqds = await Qad.query().where('stat', 1)
    }
}


