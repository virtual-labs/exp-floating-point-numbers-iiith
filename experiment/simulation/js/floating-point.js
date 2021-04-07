
function ReverseString(str) 
{
    return str.split('').reverse().join('')
}
 function hello()
 {
    document.getElementById("input-decimal").value = ""
    document.getElementById("input-exponent").value = ""
    document.getElementById("integral label").innerHTML = ""
    document.getElementById("integral Representation").innerHTML = ''
    document.getElementById("8-bit label").innerHTML = ""
    document.getElementById("8-bit Representation").innerHTML = ''
    document.getElementById("fractional label").innerHTML = ""
    document.getElementById("fractional Representation").innerHTML = ''
    document.getElementById("number label").innerHTML = ""
    document.getElementById("number Representation").innerHTML = ''
    document.getElementById("normalised label").innerHTML = ""
    document.getElementById("normalised Representation").innerHTML = ''
    document.getElementById("sign label").innerHTML = ""
    document.getElementById("sign").innerHTML = ''
    document.getElementById("bias label").innerHTML = ""
    document.getElementById("bias").innerHTML = ''
    document.getElementById("mantiss label").innerHTML = ""
    document.getElementById("mantiss").innerHTML = ''
    document.getElementById("expone label").innerHTML = ""
    document.getElementById("expone").innerHTML = ''
    document.getElementById("result").innerHTML = ""
    document.getElementById("result-container").style.backgroundColor ="white";
 }
function convert()
{
        document.getElementById("result").innerHTML = "RESULTS"
        var a = document.getElementById("input-decimal").value
        var exp = document.getElementById("input-exponent").value
        var bias = Math.pow(2, exp - 1) - 1
        sign = 0
        if (a[0] == '-'){
            var temp = a.split('-')
            a = temp[1]
            sign = 1
        }
        var integer_part = parseInt(a)
        var decimal_part = parseFloat(a) - integer_part
        var ans = integer_part
        str = ""
        cnt = 0
        if(ans > 1)
        {
            while(ans >= 1)
            {
                if(ans % 2 == 1)
                    str += "1"
                else{
                    str += "0"
                }
                ans = parseInt(ans/2)
                cnt += 1
            }
        }
        else
        {
            if(ans == 1)
                str = "1"
            else
                str = "0"
        }
        document.getElementById("integral label").innerHTML = "Binary Representation Of Integeral Part"
        document.getElementById("integral Representation").innerHTML = '<input type="text" id="integral" >'
        document.getElementById("integral").value = ReverseString(str)
        ans = decimal_part
        str2 = ""
        itr = 0
        while(ans != 0.0 && itr < 8)
        {
            ans = ans * 2
            str2 = str2 + parseInt(ans)
            ans = parseFloat(ans) - parseInt(ans)
            itr = itr + 1
        }

        if(itr == 0){
            str2 = "0"
        }
        var expone = 0
        mantissa = ""
        var number = ReverseString(str) +'.'+str2
        cnt = 0
        while(1)
        {
            cnt += 1
            if(number[cnt] == ".")
                break
        }
        var integral_bin = parseInt(ReverseString(str))
        // console.log(integral_bin)
        var str_bin = ReverseString(str) + str2
        // console.log(str.length)
        if(integral_bin >= 1)
        {
            // console.log("hlo")
            mantissa = ""
            itr = 0
            while(1)
            {
                mantissa += str_bin[itr]
                if(itr == 0)
                    mantissa += "."
                if(itr == 7 || itr == str_bin.length - 1)
                    break
                itr += 1
            }
            expone = bias + cnt - 1
            // console.log(cnt,itr)
        }
        var res = mantissa.split(".")
        ans = parseInt(res[1])
        str1 = ""
        cnt2 = 0

        ans = parseInt(expone)
        while(ans >= 1)
        {
            if(ans % 2 == 1)
                str1 += "1"
            else{
                str1 += "0"
            }
            ans = parseInt(ans/2)
            cnt2 += 1   
        }
        bin_expone = ReverseString(str1)
        if(cnt2 < exp)
        {
            temp = ""
            for(var i = 0; i < exp - cnt2; i++)
                temp += "0"
            temp += bin_expone
            bin_expone = temp
        }
        console.log(res)
        bin_mantissa = res[1]
        if(bin_mantissa.length > 7 - exp)
        {
            temp = ""
            for(var i = 0; i < 7 - exp; i++)
                temp += bin_mantissa[i]
            bin_mantissa = temp
        }
        if(bin_mantissa.length < 7 - exp)
        {
            for(var i = 0; i < 7 - exp - bin_mantissa.length; i++)
                bin_mantissa += "0"
        }
        var bit_rep = ""
        bit_rep = sign + bin_expone + bin_mantissa
        
        document.getElementById("8-bit label").innerHTML = "8-bit binary"
        document.getElementById("8-bit Representation").innerHTML = '<input type="text" id="eight-bit" >'
        document.getElementById("eight-bit").value = bit_rep
        document.getElementById("eight-bit").readOnly = true;
        document.getElementById("fractional label").innerHTML = "Binary Representation Of Fractional Part"
        document.getElementById("fractional Representation").innerHTML = '<input type="text" id="fractional" >'
        document.getElementById("fractional").value = str2
        document.getElementById("fractional").readOnly = true;
        document.getElementById("number label").innerHTML = "Binary Representation of the Number"
        document.getElementById("number Representation").innerHTML = '<input type="text" id="answer" >'
        document.getElementById("answer").value = number
        document.getElementById("answer").readOnly = true;
        document.getElementById("normalised label").innerHTML = "Normalised Representation of the Number"
        document.getElementById("normalised Representation").innerHTML = '<input type="text" id="normalised" >'
        document.getElementById("normalised").value = mantissa + " X 2 power" + (cnt -1)
        document.getElementById("normalised").readOnly = true;
        document.getElementById("sign label").innerHTML = "Sign"
        document.getElementById("sign").innerHTML = '<input type="text" id="signvalue" >'
        document.getElementById("signvalue").value = sign
        document.getElementById("signvalue").readOnly = true;
        document.getElementById("bias label").innerHTML = "Bias"
        document.getElementById("bias").innerHTML = '<input type="text" id="biasvalue" >'
        document.getElementById("biasvalue").value = "" + bias
        document.getElementById("biasvalue").readOnly = true;
        document.getElementById("mantiss label").innerHTML = "Mantiss"
        document.getElementById("mantiss").innerHTML = '<input type="text" id="mantissvalue" >'
        document.getElementById("mantissvalue").value = res[1]
        document.getElementById("mantissvalue").readOnly = true;
        document.getElementById("expone label").innerHTML = "Expone"
        document.getElementById("expone").innerHTML = '<input type="text" id="exponevalue" >'
        document.getElementById("exponevalue").value = expone
        document.getElementById("exponevalue").readOnly = true;
    }