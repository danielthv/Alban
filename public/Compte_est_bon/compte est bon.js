console.log('begin');

function twRequeteVariable(sVariable) {
    // Éliminer le "?"
    let sReq = window.location.search.substring(1);
    // Matrice de la requête
    let aReq = sReq.split("&");
    // Boucle les variables
    for (let i = 0; i < aReq.length; i++) {
        // Matrice de la variables / valeur
        let aVar = aReq[i].split("=");
        // Retourne la valeur si la variable
        // demandée = la variable de la boucle
        if (aVar[0] == sVariable) { return aVar[1]; }
    }
    // Aucune variable de trouvée.
    return (false);
}

let but = twRequeteVariable("but")
let a = twRequeteVariable("a")
let b = twRequeteVariable("b")
let c = twRequeteVariable("c")
let d = twRequeteVariable("d")
let e = twRequeteVariable("e")
let f = twRequeteVariable("f")

let premier = twRequeteVariable("premier")
let ask = twRequeteVariable("ask")

let operation = {
    0: function (a, b) { return parseInt(a) + parseInt(b) },
    1: function (a, b) { return parseInt(a) - parseInt(b) },
    2: function (a, b) { return parseInt(a) * parseInt(b) },
    3: function (a, b) { return parseInt(a) / parseInt(b) },
};

let fulltime = 0;

function cherche_tout(a, b, c, d, e, f, but, premier) {
    document.write(`Avec <b>${a}</b>, <b>${b}</b>, <b>${c}</b>, <b>${d}</b>, <b>${e}</b>, et <b>${f}</b> je cherche <b>${but}</b> :<br>`)
    let liste = [a, b, c, d, e, f]
    let operate = ['+', '-', '*', '/']
    let solution = []
    let sol = 0
    let i = j = k = l = m = 0
    let v = w = x = y = z = 0
    let thetime = new Date().getTime();
    let precedent = []
    let proche = [-1]

    for (li1 = 0; li1 < liste.length; li1++) {
        if (liste[li1] == but) {
            solution.push([])
            solution[sol].push([liste[li1]])
            precedent.push(afficher(solution[sol], but, precedent, thetime, premier, 0))
            thetime = new Date().getTime();
            sol += 1
            if (precedent.slice(-1)[0] == undefined || premier == 1) {
                console.log("exit 0");
                return 1
            }
        }
        if (proche[0] == -1) { proche[0] = liste[li1] }
        else if (Math.abs(liste[li1] - but) < Math.abs(proche[0] - but)) { proche = [liste[li1]] }
        liste2 = liste.slice()
        liste2.splice(liste.indexOf(liste[li1]), 1);

        for (li2 = 0; li2 < liste2.length; li2++) {
            i = 0
            while (i < 4) {
                v = operation[i]
                if ((v(liste[li1], liste2[li2]) == 0 || v(liste[li1], liste2[li2]) != parseInt(v(liste[li1], liste2[li2])) || v(liste[li1], liste2[li2]) < 0) && i < 4) { }
                else if ((i == 0 || i == 2) && parseInt(liste[li1]) > parseInt(liste2[li2])) { }
                else if (v(liste[li1], liste2[li2]) == parseInt(liste[li1]) || v(liste[li1], liste2[li2]) == parseInt(liste2[li2])) { }
                else {
                    if (v(liste[li1], liste2[li2]) == but) {
                        solution.push([])
                        solution[sol].push([liste[li1], operate[i], liste2[li2]])
                        precedent.push(afficher(solution[sol], but, precedent, thetime, premier, 1))
                        thetime = new Date().getTime();
                        sol += 1
                        if (precedent.slice(-1)[0] == undefined || premier == 1) {
                            console.log("exit 1");
                            return 1
                        }
                    }
                    liste3 = liste2.slice()
                    liste3.splice(liste2.indexOf(liste2[li2]), 1);
                    liste3.push(v(liste[li1], liste2[li2]))
                    li1_2 = [liste[li1], operate[i], liste2[li2], "=", v(liste[li1], liste2[li2])]
                    if (Math.abs(v(liste[li1], liste2[li2]) - but) < Math.abs(proche[0] - but)) {
                        proche = [v(liste[li1], liste2[li2])]
                        proche.push([li1_2])
                    }

                    for (li3 = 0; li3 < liste3.length; li3++) {
                        liste4 = liste3.slice()
                        liste4.splice(liste3.indexOf(liste3[li3]), 1);

                        for (li4 = 0; li4 < liste4.length; li4++) {
                            j = 0
                            while (j < 4) {
                                w = operation[j]
                                if ((w(liste3[li3], liste4[li4]) == 0 || w(liste3[li3], liste4[li4]) != parseInt(w(liste3[li3], liste4[li4])) || w(liste3[li3], liste4[li4]) < 0) && j < 4) { }
                                else if ((j == 0 || j == 2) && parseInt(liste3[li3]) > parseInt(liste4[li4])) { }
                                else if (w(liste3[li3], liste4[li4]) == parseInt(liste3[li3]) || w(liste3[li3], liste4[li4]) == parseInt(liste4[li4])) { }
                                else {
                                    if (w(liste3[li3], liste4[li4]) == but) {
                                        solution.push([])
                                        solution[sol].push([liste3[li3], operate[j], liste4[li4]])
                                        solution[sol].push(li1_2)
                                        precedent.push(afficher(solution[sol], but, precedent, thetime, premier, 2))
                                        thetime = new Date().getTime();
                                        sol += 1
                                        if (precedent.slice(-1)[0] == undefined || premier == 1) {
                                            console.log("exit 2");
                                            return 1
                                        }
                                    }
                                    liste5 = liste4.slice()
                                    liste5.splice(liste4.indexOf(liste4[li4]), 1);
                                    liste5.push(w(liste3[li3], liste4[li4]))
                                    li3_4 = [liste3[li3], operate[j], liste4[li4], "=", w(liste3[li3], liste4[li4])]
                                    if (Math.abs(w(liste3[li3], liste4[li4]) - but) < Math.abs(proche[0] - but)) {
                                        proche = [w(liste3[li3], liste4[li4])]
                                        proche.push([li3_4, li1_2])
                                    }

                                    for (li5 = 0; li5 < liste5.length; li5++) {
                                        liste6 = liste5.slice()
                                        liste6.splice(liste5.indexOf(liste5[li5]), 1);

                                        for (li6 = 0; li6 < liste6.length; li6++) {
                                            k = 0
                                            while (k < 4) {
                                                x = operation[k]
                                                if ((x(liste5[li5], liste6[li6]) == 0 || x(liste5[li5], liste6[li6]) != parseInt(x(liste5[li5], liste6[li6])) || x(liste5[li5], liste6[li6]) < 0) && k < 4) { }
                                                else if ((k == 0 || k == 2) && parseInt(liste5[li5]) > parseInt(liste6[li6])) { }
                                                else if (x(liste5[li5], liste6[li6]) == parseInt(liste5[li5]) || x(liste5[li5], liste6[li6]) == parseInt(liste6[li6])) { }
                                                else {
                                                    if (x(liste5[li5], liste6[li6]) == but) {
                                                        solution.push([])
                                                        solution[sol].push([liste5[li5], operate[k], liste6[li6]])
                                                        solution[sol].push(li3_4)
                                                        solution[sol].push(li1_2)
                                                        precedent.push(afficher(solution[sol], but, precedent, thetime, premier, 3))
                                                        thetime = new Date().getTime();
                                                        sol += 1
                                                        if (precedent.slice(-1)[0] == undefined || premier == 1) {
                                                            console.log("exit 3");
                                                            return 1
                                                        }
                                                    }
                                                    liste7 = liste6.slice()
                                                    liste7.splice(liste6.indexOf(liste6[li6]), 1);
                                                    liste7.push(x(liste5[li5], liste6[li6]))
                                                    li5_6 = [liste5[li5], operate[k], liste6[li6], "=", x(liste5[li5], liste6[li6])]
                                                    if (Math.abs(x(liste5[li5], liste6[li6]) - but) < Math.abs(proche[0] - but)) {
                                                        proche = [x(liste5[li5], liste6[li6])]
                                                        proche.push([li5_6, li3_4, li1_2])
                                                    }

                                                    for (li7 = 0; li7 < liste7.length; li7++) {
                                                        liste8 = liste7.slice()
                                                        liste8.splice(liste7.indexOf(liste7[li7]), 1);

                                                        for (li8 = 0; li8 < liste8.length; li8++) {
                                                            l = 0
                                                            while (l < 4) {
                                                                y = operation[l]
                                                                if ((y(liste7[li7], liste8[li8]) == 0 || y(liste7[li7], liste8[li8]) != parseInt(y(liste7[li7], liste8[li8])) || y(liste7[li7], liste8[li8]) < 0) && l < 4) { }
                                                                else if ((l == 0 || l == 2) && parseInt(liste7[li7]) > parseInt(liste8[li8])) { }
                                                                else if (y(liste7[li7], liste8[li8]) == parseInt(liste7[li7]) || y(liste7[li7], liste8[li8]) == parseInt(liste8[li8])) { }
                                                                else {
                                                                    if (y(liste7[li7], liste8[li8]) == but) {
                                                                        solution.push([])
                                                                        solution[sol].push([liste7[li7], operate[l], liste8[li8]])
                                                                        solution[sol].push(li5_6)
                                                                        solution[sol].push(li3_4)
                                                                        solution[sol].push(li1_2)
                                                                        precedent.push(afficher(solution[sol], but, precedent, thetime, premier, 4))
                                                                        thetime = new Date().getTime();
                                                                        sol += 1
                                                                        if (precedent.slice(-1)[0] == undefined || premier == 1) {
                                                                            console.log("exit 4");
                                                                            return 1
                                                                        }
                                                                    }
                                                                    liste9 = liste8.slice()
                                                                    liste9.splice(liste8.indexOf(liste8[li8]), 1);
                                                                    liste9.push(y(liste7[li7], liste8[li8]))
                                                                    li7_8 = [liste7[li7], operate[l], liste8[li8], "=", y(liste7[li7], liste8[li8])]
                                                                    if (Math.abs(y(liste7[li7], liste8[li8]) - but) < Math.abs(proche[0] - but)) {
                                                                        proche = [y(liste7[li7], liste8[li8])]
                                                                        proche.push([li7_8, li5_6, li3_4, li1_2])
                                                                    }

                                                                    for (li9 = 0; li9 < liste9.length; li9++) {
                                                                        liste10 = liste9.slice()
                                                                        liste10.splice(liste9.indexOf(liste9[li9]), 1);

                                                                        for (li10 = 0; li10 < liste10.length; li10++) {
                                                                            m = 0
                                                                            while (m < 4) {
                                                                                z = operation[m]
                                                                                if ((z(liste9[li9], liste10[li10]) == 0 || z(liste9[li9], liste10[li10]) != parseInt(z(liste9[li9], liste10[li10])) || z(liste9[li9], liste10[li10]) < 0) && l < 4) { }
                                                                                else if ((m == 0 || m == 2) && parseInt(liste9[li9]) > parseInt(liste10[li10])) { }
                                                                                else if (z(liste9[li9], liste10[li10]) == parseInt(liste9[li9]) || z(liste9[li9], liste10[li10]) == parseInt(liste10[li10])) { }
                                                                                else {
                                                                                    if (z(liste9[li9], liste10[li10]) == but) {
                                                                                        solution.push([])
                                                                                        solution[sol].push([liste9[li9], operate[m], liste10[li10]])
                                                                                        solution[sol].push(li7_8)
                                                                                        solution[sol].push(li5_6)
                                                                                        solution[sol].push(li3_4)
                                                                                        solution[sol].push(li1_2)
                                                                                        precedent.push(afficher(solution[sol], but, precedent, thetime, premier, 5))
                                                                                        thetime = new Date().getTime();
                                                                                        sol += 1
                                                                                        if (precedent.slice(-1)[0] == undefined || premier == 1) {
                                                                                            console.log("exit 5");
                                                                                            return 1
                                                                                        }
                                                                                    }
                                                                                    liste11 = liste10.slice()
                                                                                    liste11.splice(liste10.indexOf(liste10[li10]), 1);
                                                                                    liste11.push(z(liste9[li9], liste10[li10]))
                                                                                    li9_10 = [liste9[li9], operate[m], liste10[li10], "=", z(liste9[li9], liste10[li10])]
                                                                                    if (Math.abs(z(liste9[li9], liste10[li10]) - but) < Math.abs(proche[0] - but)) {
                                                                                        proche = [z(liste9[li9], liste10[li10])]
                                                                                        proche.push([li9_10, li7_8, li5_6, li3_4, li1_2])
                                                                                    }

                                                                                    for (li11 = 0; li11 < liste11.length; li11++) {
                                                                                        if (liste11[li11] == but) {
                                                                                            solution.push([])
                                                                                            solution[sol].push(liste11[li11])
                                                                                            solution[sol].push(li9_10)
                                                                                            solution[sol].push(li7_8)
                                                                                            solution[sol].push(li5_6)
                                                                                            solution[sol].push(li3_4)
                                                                                            solution[sol].push(li1_2)
                                                                                            precedent.push(afficher(solution[sol], but, precedent, thetime, premier, 6))
                                                                                            thetime = new Date().getTime();
                                                                                            sol += 1
                                                                                            if (precedent.slice(-1)[0] == undefined || premier == 1) {
                                                                                                console.log("exit 6");
                                                                                                return 1
                                                                                            }
                                                                                        }
                                                                                        if (Math.abs(liste11[li11] - but) < Math.abs(proche[0] - but)) { proche = [liste11[li11], li9_10, li7_8, li5_6, li3_4, li1_2] }
                                                                                    }
                                                                                }
                                                                                m += 1
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                l += 1
                                                            }
                                                        }
                                                    }
                                                }
                                                k += 1
                                            }
                                        }
                                    }
                                }
                                j += 1
                            }
                        }
                    }
                }
                i += 1
            }
        }
    }
    if (sol == 0) {
        document.write(`<br>--<u>Aucun</u> résultat trouvé--<br>Resultat le plus proche est <b>${proche[0]}</b> en faisant :<br>`)
        console.log(proche[1]);
        for (i = proche[1].length - 1; i >= 0; i--) {
            for (j = 0; j < proche[1][i].length; j++) {
                document.write(proche[1][i][j])
            }
            document.write("<br>")
        }
        document.write(`Temps mis : ${new Date().getTime() - thetime} ms<br>`)
    }
    else {
        document.write(minLevel[1]);
        document.write("<br>--Fin--<br>")
    }
}


let numero = 1
let minLevel = [7, ""];
function afficher(resultat, but, precedent, thetime, premier, level) {
    identique = 0
    if (typeof resultat[0] != "object") {
        resultat.splice(0, 1);
        resultat[0].splice(3, 2);
    }

    compare = '<br>'
    for (i = 0; i < resultat.length - 1; i++) {
        for (k = 0; k < resultat[resultat.length - i - 1].length; k++) {
            compare += resultat[resultat.length - i - 1][k]
        }
        compare += '<br>'
    }
    if (typeof resultat[0] == "object") {
        for (i = 0; i < resultat[0].length; i++) {
            compare += resultat[0][i]
        }
        compare += '=' + but + '<br>'
    }
    for (i = 0; i < precedent.length; i++) {
        if (compare == precedent[i]) { identique = 1 }
    }

    if (identique == 0) {
        fulltime += parseInt(new Date().getTime() - thetime);
        document.write(`<br>Solution n°${numero} ${compare}`);// Temps mis : ${new Date().getTime() - thetime} ms<br>Temps total : ${fulltime} ms<br>`);
        if (level < minLevel[0]) {
            minLevel[0] = level;
            minLevel[1] = `<br>Une des solutions les plus courtes :<br>Solution n°${numero} ${compare}`;
        }
        numero++;
        if (premier == 0 && numero % ask == 0) {
            if (confirm(`Voulez-vous afficher la Solution n°${numero} et les ${ask} suivants`)) {
                thetime = new Date().getTime();
                window.scrollTo(0, document.body.scrollHeight);
                return compare
            } else {
                document.write(minLevel[1]);
                document.write(`<br>Vous avez quitté`);
                return undefined;
            }
        }
        else {
            thetime = new Date().getTime();
            return compare;
        }
    }
    else {
        thetime = new Date().getTime();
        return "";
    }
}

cherche_tout(a, b, c, d, e, f, but, premier)
console.log('end');
