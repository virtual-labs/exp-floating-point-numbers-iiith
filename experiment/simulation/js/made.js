let flagu = 1;

function ReverseString(str) {
    return str.split('').reverse().join('')
}

function min(a, b) {
    if (a < b)
        return a
    return b
}

function hello(flg) {
    if (flg == 1) {
        document.getElementById("input-decimal").value = ""
        document.getElementById("input-exponent").value = ""
        document.getElementById("integral label").innerHTML = ""
        document.getElementById("integral Representation").innerHTML = ''
        document.getElementById("8-bit label").innerHTML = ""
        document.getElementById("eightrep").innerHTML = ''
        document.getElementById("eightrep").style.borderCollapse = "collapse";
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
        document.getElementById("result-container").style.backgroundColor = "white";
    } else if (flg == 0) {
        var table = document.getElementById("four-bit-table");
        for (let i in table.rows) {
            let row = table.rows[i]
            for (let j = 0; j < 5; j++) {
                let col = row.cells[j]
                col.style.backgroundColor = "white"
            }
        }
        document.getElementById("input-decimal").value = ""
    }
}

function convert(flg) {
    console.log(flg)
    let a = document.getElementById("input-decimal").value
    let exp = 2
    if (flg == 1) {
        document.getElementById("result").innerHTML = "RESULTS"
        exp = document.getElementById("input-exponent").value
    }
    let bias = Math.pow(2, exp - 1) - 1
    let sign_box = 0
    if (a[0] == '-') {
        let temp = a.split('-')
        a = temp[1]
        sign_box = 1
    }
    let integer_part = parseInt(a)
    let decimal_part = parseFloat(a) - integer_part
    let ans = integer_part
    str = ""
    cnt = 0
    if (ans > 1) {
        while (ans >= 1) {
            if (ans % 2 == 1)
                str += "1"
            else {
                str += "0"
            }
            ans = parseInt(ans / 2)
            cnt += 1
        }
    } else {
        if (ans == 1)
            str = "1"
        else
            str = "0"
    }
    str = ReverseString(str)
    if (flg == 1) {
        document.getElementById("integral label").innerHTML = "Binary Representation Of Integeral Part"
        document.getElementById("integral Representation").innerHTML = '<textarea  id="integral" > </textarea>'
        document.getElementById("integral").value = str
        document.getElementById("integral").readOnly = true;
    }
    // console.log("This is the binary -> " + str)
    ans = decimal_part
        // console.log("This is the decimal -> " + ans)
    str2 = ""
    itr = 0
    while (ans != 0.0 && itr < 8) {
        ans = ans * 2
        str2 = str2 + parseInt(ans)
        ans = parseFloat(ans) - parseInt(ans)
        itr = itr + 1
    }

    if (itr == 0) {
        str2 = "0"
    }
    let expone = 0
    mantissa = ""
    let number = str + '.' + str2
    cnt = 0
    while (1) {
        cnt += 1
        if (number[cnt] == ".")
            break
    }
    let integral_bin = parseInt(str)
    let str_bin = str + str2
        // console.log(str_bin)
    if (integral_bin >= 1) {
        mantissa = ""
        itr = 0
        while (1) {
            mantissa += str_bin[itr]
            if (itr == 0)
                mantissa += "."
            if (itr == 7 || itr == str_bin.length - 1)
                break
            itr += 1
        }
        expone = bias + cnt - 1
    } else {
        mantissa = ""
        itr = 0
        let flg2 = 0
        let pwr = 0
        while (1) {
            if (flg2 == 1)
                mantissa += str_bin[itr]
            if (str_bin[itr] == '1' && flg2 == 0) {
                mantissa += str_bin[itr]
                flg2 = 1
                mantissa += "."
                pwr = itr
            }
            if (itr == 8 || itr == str_bin.length - 1)
                break
            itr += 1
        }
        cnt = -1 * (pwr - 1)
        expone = bias + cnt - 1
        if (mantissa[mantissa.length - 1] == '.')
            mantissa += '0'
    }
    let res = mantissa.split(".")
    ans = parseInt(res[1])
    str1 = ""
    cnt2 = 0

    ans = parseInt(expone)
    while (ans >= 1) {
        if (ans % 2 == 1)
            str1 += "1"
        else {
            str1 += "0"
        }
        ans = parseInt(ans / 2)
        cnt2 += 1
    }
    let bin_expone = ReverseString(str1)
    if (cnt2 < exp) {
        temp = ""
        for (let i = 0; i < exp - cnt2; i++)
            temp += "0"
        temp += bin_expone
        bin_expone = temp
    }
    // console.log(res)
    let bin_mantissa = res[1]
    if (bin_mantissa.length > 7 - exp) {
        temp = ""
        for (let i = 0; i < 7 - exp; i++)
            temp += bin_mantissa[i]
        bin_mantissa = temp
        mantissa = "1." + temp
    }
    if (bin_mantissa.length < 7 - exp) {
        let len = bin_mantissa.length
        for (let i = 0; i < 7 - exp - len; i++) {
            bin_mantissa += '0'
            mantissa += '0'
        }
    }
    if (cnt2 > exp) {
        temp = ""
        for (let i = 0; i < exp; i++)
            temp += bin_expone[i]
        bin_expone = temp
    }
    let bit_rep = ""
    bit_rep = sign_box + bin_expone + bin_mantissa
    if (flg == 1) {
        document.getElementById("8-bit label").innerHTML = "8-bit binary"
        let tbl = document.getElementById("eightrep");
        tbl.innerHTML = "";
        tbl.style.border = "2px solid #288EC8";
        tbl.style.borderRadius = "4px";
        let row = tbl.insertRow(-1);
        let cell1 = row.insertCell(0);
        idx = 1;
        cell1.innerHTML = sign_box;
        cell1.style.color = "rgb(164, 198, 82)";
        cell1.style.fontWeight = 'bolder';
        for (let i = 0; i < bin_expone.length; i++) {
            cellx = row.insertCell(idx);
            cellx.innerHTML = bin_expone[i];
            cellx.style.color = "#288EC8";
            cellx.style.fontWeight = 'bolder';
            idx++;
        }
        for (let i = 0; i < bin_mantissa.length; i++) {
            cellx = row.insertCell(idx);
            cellx.innerHTML = bin_mantissa[i];
            cellx.style.color = "#bd3000";
            cellx.style.fontWeight = 'bolder';
            idx++;
        }
        document.getElementById("fractional label").innerHTML = "Binary Representation Of Fractional Part"
        document.getElementById("fractional Representation").innerHTML = '<textarea id="fractional" > </textarea>'
        document.getElementById("fractional").value = str2;
        document.getElementById("fractional").readOnly = true;
        document.getElementById("number label").innerHTML = "Binary Representation of the Number"
        document.getElementById("number Representation").innerHTML = '<textarea "id="answer" > </textarea>'
        document.getElementById("answer").value = number;
        document.getElementById("answer").readOnly = true;
        document.getElementById("normalised label").innerHTML = "Normalised Representation of the Number"
        document.getElementById("normalised Representation").innerHTML = '<textarea id="normalised" > </textarea>'
        document.getElementById("normalised").value = mantissa + " X 2 power" + (cnt - 1)
        document.getElementById("normalised").readOnly = true;
        document.getElementById("sign label").innerHTML = "Sign"
        document.getElementById("sign").innerHTML = '<textarea id="signvalue" ></textarea>'
        document.getElementById("signvalue").value = sign_box
        document.getElementById("signvalue").readOnly = true;
        document.getElementById("bias label").innerHTML = "Bias"
        document.getElementById("bias").innerHTML = '<textarea id="biasvalue" ></textarea>'
        document.getElementById("biasvalue").value = "" + bias
        document.getElementById("biasvalue").readOnly = true;
        document.getElementById("mantiss label").innerHTML = "Mantiss"
        document.getElementById("mantiss").innerHTML = '<textarea id="mantissvalue" ></textarea>'
        document.getElementById("mantissvalue").value = bin_mantissa
        document.getElementById("mantissvalue").readOnly = true;
        document.getElementById("expone label").innerHTML = "Expone"
        document.getElementById("expone").innerHTML = '<textarea id="exponevalue" ></textarea>'
        document.getElementById("exponevalue").value = expone
        document.getElementById("exponevalue").readOnly = true;
        // adjust()
    }
    if (flg == 0) {
        flt = document.getElementById("input-decimal").value

        // flt = parseInt(flt)
        let mnts = ""
        let frac = ""
        for (let i = 0; i < 2; i++)
            mnts += bin_mantissa[i]
        for (let i = 0; i < min(2, str2.length); i++)
            frac += str_bin[i]
        var table = document.getElementById("four-bit-table")
        for (let i in table.rows) {
            let row = table.rows[i]
            let col = row.cells[0].innerHTML
            if (col == bin_expone) {
                let col1 = row.cells[1].innerHTML
                if (col1 == mnts) {
                    for (let j = 0; j < 4; j++)
                        row.cells[j].style.backgroundColor = "rgb(164, 198, 82)"
                }
                // console.log(col1, frac)
                if (col1 == frac && frac != mnts && flt < 1) {
                    row.cells[0].style.backgroundColor = "#288EC8"
                    row.cells[1].style.backgroundColor = "#288EC8"
                    row.cells[4].style.backgroundColor = "#288EC8"
                }
                if (flt >= 1 && col1 == mnts)
                    row.cells[4].style.backgroundColor = "rgb(164, 198, 82)"
            }

        }
    }
}

// function adjust() {
//     const texts = ["#integral", "#fractional", "#answer", "#normalised", "#signvalue", "#biasvalue", "#mantissvalue", "#exponevalue"]
//     texts.forEach(element => {
//         textarea = document.querySelector(element);
//         textarea.style.height = 'auto';
//         console.debug(" before hei ", textarea.style.height);
//         textarea.style.height = (20 + obj.scrollHeight) + 'px';
//         console.debug(" after hei ", textarea.style.height);

//     });
// }