/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/ticket', 'HomeController.index')

Route.get('/queue', 'QsersController.index')
Route.post('/queue', 'QsersController.store')


Route.get('/print', 'QsersController.printTick')
Route.get('/monitor', 'MonitsController.index')
Route.post('/qtel', 'QsersController.tellerCall')
Route.get('/qtel/general', 'QsersController.getGeneral')
Route.get('/qtel/services', 'QsersController.getServiceWaiting')
Route.get('/qtel/flow', 'QsersController.getFLowNumber')



Route.get('/gruop', 'AppsController.groupList').as('pmis.groupList')
Route.post('/gruop', 'AppsController.CreategroupList').as('pmis.createGroup')
Route.get('/group/config', 'AppsController.groupConfig').as('pmis.groupConfig')



Route.get('/appService', 'AppsController.xservice').as('pmis.services')
Route.get('/appService/:id', 'AppsController.upService').as('pmis.upservices')
Route.post('/createService', 'AppsController.createService').as('pmis.createService')
Route.put('/updateBranch/:id', 'AppsController.updateBranch').as('pmis.updateBranch')


Route.get('/branch', 'AppsController.showBranch').as('pmis.branch')
Route.post('/branch', 'AppsController.createBranch').as('pmis.createbranch')
Route.get('/branch/:id', 'AppsController.show1Branch').as('pmis.show1Branch')
Route.delete('/branch/:id', 'AppsController.deleteBranch').as('pmis.deleteBranch')


Route.get('/appSetting', 'AppsController.xsetting').as('pmis.setting')
Route.get('/transaction', 'AppsController.transaction').as('pmis.transaction')

Route.get('/appAds', 'AppsController.xads')
Route.get('/login', 'AuthController.loginShow')
Route.get('/ucreate', 'AuthController.RegisterShow')
Route.post('/register', 'AuthController.Register').as('auth.reg')

Route.post('/login', 'AuthController.login').as('auth.login')



Route.get('/', 'AuthController.Admin')