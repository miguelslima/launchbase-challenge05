module.exports = {
  age: function(timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp)  
  
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if(month < 0 || month == 0 && today.getDate() < birthDate.getDate()){
      age = age - 1;
    }

    return age;
  },
  date: function(timestamp) {
    const date = new Date(timestamp)

    const year = date.getUTCFullYear();
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const day = `0${date.getUTCDate()}`.slice(-2);

    return `${year}-${month}-${day}`;
  },
  graduation: function(select) {
    if (select == "ensinomedio"){
      return "Ensino Médio";
    }else if

      (select == "ensinosuperior"){
        return "Superior Completo";
    }else if

      (select == "mestrado"){
        return "Mestrado";
    }else if

      (select == "doutorado"){
        return "Doutorado";
    }
  },
  tipoaula: function(tipoaula){
    if (tipoaula == "presencial") {
      return "Presencial";
    }
    return "À distancia"
  },
  yearSchool: function(select) {
    if (select == "5.ano"){
      return "5º Ano Ensino Fundamental";
    }else if

      (select == "6.ano"){
        return "6º Ano Ensino Fundamental";
    }else if

      (select == "7.ano"){
        return "7º Ano Ensino Fundamental";
    }else if

      (select == "8.ano"){
        return "8º Ano Ensino Fundamental";
    }else if

      (select == "9.ano"){
        return "9º Ano Ensino Fundamental";
    }else if

      (select == "1.medio"){
        return "1º Ano Ensino Médio";
    }else if

      (select == "2.medio"){
        return "2º Ano Ensino Médio";
    }else if

    (select == "3.medio"){
      return "3º Ano Ensino Médio";
  }
  }
}
