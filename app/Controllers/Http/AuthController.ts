import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
    public async loginShow({ view }: HttpContextContract) {
        return view.render('login')
    }
    public async RegisterShow({ view }: HttpContextContract) {
        return view.render('ucreate')
    }
    public async login({ request, response, auth, session }: HttpContextContract) {
        // grab uid and password values off request body
        const { username, password } = request.only(['username', 'password'])

        try {
            // attempt to login
            await auth.attempt(username, password)
        } catch (error) {
            // if login fails, return vague form message and redirect back
            session.flash('form', 'Your username, email, or password is incorrect')
            return response.redirect().back()
        }

        // otherwise, redirect to home page
        return response.redirect('/')
    }

    public async Register({ request, response, auth }: HttpContextContract) {
        // create validation schema for expected user form data
        const userSchema = schema.create({
            username: schema.string({ trim: true }, [rules.unique({ table: 'sq_user', column: 'username', caseInsensitive: true })]),
            email: schema.string({ trim: true }, [rules.email(), rules.unique({ table: 'sq_user', column: 'email', caseInsensitive: true })]),
            password: schema.string({}, [rules.minLength(8)])
        })

        // get validated data by validating our userSchema
        // if validation fails the request will be automatically redirected back to the form
        const data = await request.validate({ schema: userSchema })

        // create a user record with the validated data
        const user = await User.create(data)

        // login the user using the user model record
        await auth.login(user)

        // redirect to the login page
        return response.redirect('/')
    }










    public async Admin({ view }) {
        return view.render(
            'admin'
        )
    }
}
