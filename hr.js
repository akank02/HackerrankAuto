// const puppet=require('puppeteer');
// let page;
// const browserOpen=puppet.launch({headless:false});
// browserOpen.then(function(browser){
//     console.log("hello");
//     let pageArrpromise=browser.pages();
//     return pageArrpromise;
// }).then(function(browserPages){
//     page=browserPages[0];
//     let gotopromise=page.goto("https://www.google.com/")
//     return gotopromise;
// }).then(function(){
//     let elementwaitpromise=page.waitForSelector();
// // })


const puppet= require('puppeteer');
const codeobj= require('./codes')
const loginlink='https://www.hackerrank.com/auth/login'; 
let page;
const email='fadetec101@usharer.com'
const password='@Hello'

//lets load the windows first 
const browseropenpromise=puppet.launch({
    headless:false,
    
    args:['--start-maximized'],

    defaultViewport:null
    }).then(function(browser){
        let pagearray=browser.newPage();
        return pagearray;
    }).then(function(newtab){
        page=newtab;
        let hackerrankopenpromise=newtab.goto(loginlink)
        return hackerrankopenpromise;
    }).then(function(){
        let emailisentered=page.type("input[id='input-1']",email, {delay:50});
        return emailisentered
    }).then(function(){
        let passwordisentered=page.type("input[type='password']",password, {delay:50})
        return passwordisentered
    }).then(function(){
        let loginbuttonclick=page.click('button[data-analytics="LoginPassword"]', {delay:50})
        return loginbuttonclick
    }).then(function(){
        let clickonalgopromise=waitandclick('.topic-name[data-automation="algorithms"]', page)
        return clickonalgopromise

    }).then(function(){
        let gettowarmup=waitandclick('input[value="warmup"]', page)
        return gettowarmup
    }).then(function(){
        let waitfor3seconds=page.waitForTimeout(3000)
        return waitfor3seconds;
    }).then(function(){
        let allchallengespromise=page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', {delay: 50})
        return allchallengespromise;
    }).then(function(questionarray){
        console.log(questionarray.length);
        let questionwillbesolved=questionsolver(page, questionarray[0], codeobj.answers[0] )
        return questionwillbesolved;
    })


    function waitandclick(selector, cpage){
        return new Promise(function(resolve,reject){
            let waitformodulepromise=cpage.waitForSelector(selector)
            waitformodulepromise.then(function(){
                let clickmodal=cpage.click(selector)
                return clickmodal
            }).then(function(){
                resolve()
            }).catch(function(err){
                reject()
            })
        })
    }


    function questionsolver( page, question, answer){
        return new Promise(function(resolve, reject){
            let questionwillbeclicked=question.click()
            questionwillbeclicked.then(function(){
                let editorinfocuspromise=waitandclick('.monaco-editor.no-user-select.vs', page)
                return editorinfocuspromise
            }).then(function(){
                return waitandclick('.checkbox-input',page)
            }).then(function(){
                return page.waitForSelector('textarea.custominput',page)
            }).then(function(){
                return page.type('textarea.custominput', answer, {delay:10})
            }).then(function(){
                let ctrlispressed= page.keyboard.down('Control')
                return ctrlispressed
            }).then(function(){
                let aispressed= page.keyboard.press('A', {delay: 100})
                return aispressed;
            }).then(function(){
                let xispressed= page.keyboard.press('X', {delay: 100})
                return xispressed;
            }).then(function(){
                let controlisunpressed= page.keyboard.up('Control')
                return controlisunpressed
            }).then(function(){
                let maineditorinfocus= waitandclick('.monaco-editor.no-user-select.vs', page)
                return maineditorinfocus;
            }).then(function(){
                let ctrlispressed= page.keyboard.down('Control')
                return ctrlispressed
            }).then(function(){
                let aispressed= page.keyboard.press('A', {delay: 100})
                return aispressed;
            }).then(function(){
                let vispressed= page.keyboard.press('V', {delay: 100})
                return vispressed;
            }).then(function(){
                let controlisunpressed= page.keyboard.up('Control')
                return controlisunpressed
            }).then(function(){
                return page.click('.hr-monaco__run-code', {delay:50})
            }).then(function(){
                return page.click('.hr-monaco-submit',  {delay:50})
            }).then(function(){ 
                resolve()
            }).catch(function(err){
                console.log("error")
                reject();
            })
        })
    }