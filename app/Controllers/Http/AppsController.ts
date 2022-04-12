import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Branch from 'App/Models/Branch'
import Groupcon from 'App/Models/Groupcon'
import Groupm from 'App/Models/Groupm'

import Qad from "App/Models/Qad"
import Qservice from "App/Models/Qservice"
import Qsetting from "App/Models/Qsetting"
import Qtx from 'App/Models/Qtx'

export default class AppsController {

    public async xservice({ view }) {
        const rsServ = await Qservice.query().orderBy('seq', 'asc')
        return view.render('appService', {
            itserve: rsServ
        })
    }

    public async upService({ request, params, view, response }: HttpContextContract) {
        const mService = await Qservice.find(params.id)
        return view.render('service_form', {
            mService
        })
    }

    public async createService({ request, session, response }: HttpContextContract) {
        const body = schema.create({
            qcode: schema.string(),
            title: schema.string()
        })
        const playload = await request.validate({ schema: body })
        try {
            await Qservice.create(playload)

            return response.redirect('/appService')
        } catch (e) {
            console.log(e)
        }

    }

    public async groupList({ view, response }: HttpContextContract) {
        const rGroup = await Groupm.all()
        return view.render('group', {
            rGroup
        })

    }
    public async CreategroupList({ request, response }: HttpContextContract) {
        const { id, title } = request.all()
        try {
            const rGroup = await Groupm.create({
                id,
                title
            })
            return response.redirect('/gruop')
        } catch (e) {

        }

    }
    public async groupConfig({ view, response }: HttpContextContract) {
        const rGroupList = await Groupcon.all()
        return view.render('group_config', {
            rGroupList
        })

    }


    public async showBranch({ view }: HttpContextContract) {
        const lban = await Branch.all()
        return view.render('branch', {
            lban
        })

    }
    public async createBranch({ request, session, response }: HttpContextContract) {
        const body = schema.create({
            branch_code: schema.string(),
            description: schema.string(),
            stat: schema.boolean()
        })
        const playload = await request.validate({ schema: body })
        const lban = await Branch.create(playload)
    }
    public async updateBranch({ request,params, session, response }: HttpContextContract) {
        const body = schema.create({
            description: schema.string(),
            client_ip: schema.string(),
            client_token: schema.string(),
            stat: schema.boolean()
        })
        const playload = await request.validate({ schema: body })
        try {
            const lban = await Branch.find(params.id)
            lban.description = playload.description
            lban.client_ip = playload.client_ip
            lban.client_token = playload.client_token
            lban.stat = playload.stat

            await lban.save()
        } catch (e) {

        }

    }
    public async deleteBranch({ request, params, session, response }: HttpContextContract) {
        const rsban = await Branch.find(params.id)
        rsban.delete()

        return response.redirect('/branch')
    }
    public async show1Branch({ request, params, view, session, response }: HttpContextContract) {
        const branch = await Branch.find(params.id)
        return view.render('branch_form', {
            branch
        })
    }


    public async xsetting({ view }) {
        const rsSet = await Qsetting.all()
        return view.render('appSetting', {
            itset: rsSet
        })
    }


    public async xads({ view }) {
        const rsSet = await Qad.all()
        return view.render('appAds', {
            itAds: rsSet
        })
    }

    public async transaction({ view }) {
        const rsTxn = await Qtx.all()
        return view.render('transaction', {
            rsTxn
        })
    }

}
