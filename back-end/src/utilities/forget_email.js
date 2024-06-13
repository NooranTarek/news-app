import nodemailer from 'nodemailer'

export const sendCodeEmail = async(to,subject,html)=>{

    let transporter = nodemailer.createTransport({
        service:"gmail", 
        auth: {
          user:"noort.mohamed@gmail.com",
          pass:"jrdamjhcdphgdfey"
        },
      });


    let info = await transporter.sendMail({
        from: '"Admin" <noort.mohamed@gmail.com>',
        to, 
        subject,
        html, 
      });    
}
