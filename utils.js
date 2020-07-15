module.exports = {

    age: function(timestamp) {
        const today = new Date();
        const birthDate = new Date(timestamp);

        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();

        if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
            age = age - 1
        }

        return age;
    },

    date: function(timestamp){
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() +1}`.slice(-2);
        const day = `${date.getUTCDate()}`.slice(-2);

        return `${year}-${month}-${day}`

    },
/*     populateUFs: function populateUFs(uf){
        const ufSelect = document.querySelector("select[name=uf");
        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then (function(res){
            return res.json()
        })
        .then (function(states){
            for (const state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
    } */
}
