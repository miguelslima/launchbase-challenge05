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

    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`,
      isot: `${day}-${month}-${year}`,
      birthDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`
    }
  },
  graduation: function(graduation) {
    if (graduation == "ensinomedio"){
      return "Ensino Médio";
    }else if

      (graduation == "ensinosuperior"){
        return "Superior Completo";
    }else if

      (graduation == "mestrado"){
        return "Mestrado";
    }else if

      (graduation == "doutorado"){
        return "Doutorado";
    }
  },
  tipoaula: function(class_type){
    if (class_type == "presencial") {
      return "Presencial";
    }
    return "À distancia"
  },
  yearSchool: function(yearSchool) {
    if (yearSchool == "5.ano"){
      return "5º Ano Ensino Fundamental";
    }else if

      (yearSchool == "6.ano"){
        return "6º Ano Ensino Fundamental";
    }else if

      (yearSchool == "7.ano"){
        return "7º Ano Ensino Fundamental";
    }else if

      (yearSchool == "8.ano"){
        return "8º Ano Ensino Fundamental";
    }else if

      (yearSchool == "9.ano"){
        return "9º Ano Ensino Fundamental";
    }else if

      (yearSchool == "1.medio"){
        return "1º Ano Ensino Médio";
    }else if

      (yearSchool == "2.medio"){
        return "2º Ano Ensino Médio";
    }else if

    (yearSchool == "3.medio"){
      return "3º Ano Ensino Médio";
    }
  }
}
