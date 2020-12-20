import TextField from '@material-ui/core/TextField'; 
import { withStyles} from '@material-ui/core/styles';


export function ValidateUsername(str) {
    if(str.length > 3) return ""
    return "must be longer than 3 letters"
}

export function ValidatePassword(str) {
    if(str.length > 3){
      let containNumber = false;
      var format = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/;
      for(let i=0;i<str.length;i++){
        if(str[i]<='9' && str[i] >= '0' )
        {
          containNumber  =true;
        }
      }
      if(containNumber===false){
        return "you missed number"
      }
      if( str.match(format) ){
        return "";
      }
      else {
        return "you missed special character"
      }
    }
    return "must be longer than 3 letters"
}

export function ValidatePasswordR(str1,str2){
    if(str1===str2){
      return "";
    }
    else return "Passwords unmatched" ;
}


export const ValidationTextField = withStyles({
    root: {
      '& input:valid + fieldset': {
        borderColor: 'green',
        borderWidth: 2,
      },
      '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 2,
      },
      '& input:valid:focus + fieldset': {
        borderLeftWidth: 6,
        padding: '4px !important', // override inline-style
      },
    },
  })(TextField);