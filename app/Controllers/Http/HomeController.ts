import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Qservice from 'App/Models/Qservice'

export default class HomeController {
    public async index({ request, response, view }: HttpContextContract) {

        const rs = await Qservice.all();
        return view.render('home', {
            services: rs
        })
    }
}
