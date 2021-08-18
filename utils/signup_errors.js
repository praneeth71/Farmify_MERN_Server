const make_signup_errors = (err)=>{
    var errors = {
        userid:'',
        adhaar_id:'',
        contactno:'',
        password:'',
    };
    console.log(err);
    if ('username' in err){
        errors['username'] = 'user id should be atleast 6 chars long';
    }
    if('adhaar_id' in err){
        errors['adhaar_id'] = 'adhaar id should be unique and should contain 16 numbers only';
    }
    if('contactno' in err){
        errors['contactno'] = 'contact number should contain 10 numbers only and should be unique';
    }
    if('password' in err){
        errors['password'] = 'password should be 6 chars long';
    }
    return errors;
 }


const crop_errors = (err)=>{
    const errors = {
        'cropname':'',
        'contactno':'',
    };
    if('cropname' in err){
        errors['cropname'] = 'cropname should be minimum length of 4 chars';
    } 
    if('contactno' in err){
        errors['contactno'] = 'contactno should contain 10 digits only';
    }
    return errors;
}

const deal_errors = (err)=>{
    const errors = {
        'cropname':'',
        'contactno':'',
    };
    if('cropname' in err){
        errors['cropname'] = 'cropname should be minimum length of 4 chars';
    } 
    if('contactno' in err){
        errors['contactno'] = 'contactno should contain 10 digits only';
    }
    return errors;
}

module.exports = {make_signup_errors,crop_errors,deal_errors}