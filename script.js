const myAtropos = Atropos({
    el: '.my-atropos',
    rotateXMax: 25,
    rotateYMax: 25,
    shadow: false,
  });

  onload = listaPokemon

  function listaPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    .then(response => response.json())
    .then(data => {

        for (let i = 0; i < data.count; i++) {
              const nombres = data.results[i].name
              const datalist = document.querySelector('#buscador')
              const opciones = document.createElement('option')
              opciones.value = nombres
              datalist.appendChild(opciones)
            }
    })
    .catch(error => {
        console.log('Hubo un error: ', error)
    })
}
  
  function llamarApi() {
    
    let pokemon = document.querySelector('#buscar').value

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(response => response.json())
    .then(data => {
      completarDatos(data.id, data.name, data.types, data.stats[0].base_stat, data.stats[1].base_stat, data.stats[2].base_stat, data.stats[2].base_stat, data.stats[3].base_stat, data.stats[4].base_stat, data.stats[5].base_stat)
    })
    .catch(error => {
      console.log('Hubo un error:', error)
    })
  }

  function completarDatos(id, name, tipo, hp, atk, def, satk, sdef, vel) {
    
    const Id = document.querySelector('#id')
    const img = document.querySelector('#img')
    const nombre = document.querySelector('#nombre')
    const Hp = document.querySelector('#hp')
    const Atk = document.querySelector('#atk')
    const Def = document.querySelector('#def')
    const s_atk = document.querySelector('#s_atk')
    const s_def  = document.querySelector('#s_def')
    const speed = document.querySelector('#speed')

    const b_hp = document.querySelector('.hp')
    const b_atk = document.querySelector('.atk')
    const b_def = document.querySelector('.def')
    const bs_atk = document.querySelector('.s_atk')
    const bs_def = document.querySelector('.s_def')
    const b_speed = document.querySelector('.speed')


    if(id <= 9) {
      Id.textContent = '#00' + id
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    } else if (id >= 10 & id <= 99) {
      Id.textContent = '#0' + id
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    } else {
      Id.textContent = '#' + id
      img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    }

    nombre.textContent = name
    Hp.textContent = hp
    Atk.textContent = atk
    Def.textContent = def
    s_atk.textContent = satk
    s_def.textContent = sdef
    speed.textContent = vel

    b_hp.value = hp
    b_atk.value = atk
    b_def.value = def
    bs_atk.value = satk
    bs_def.value = sdef
    b_speed.value = vel

      const tipo_uno = document.querySelector('#tipo_1')
      const tipo_dos = document.querySelector('#tipo_2')

      switch (tipo.length) {
        case 1:
          tipo_uno.src = `icon/${tipo[0].type.name}.png`
          tipo_dos.style.display = 'none'
          cambiarColor(tipo[0].type.name)
        break;
        case 2:  
        tipo_dos.style.display = 'block'
        tipo_uno.src = `icon/${tipo[0].type.name}.png`
        tipo_dos.src = `icon/${tipo[1].type.name}.png`
        cambiarColor(tipo[0].type.name)
        break;
      }
  }

  function cambiarColor(nombre) {

    const tipos = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy']
    const colores = ['#929AA1', '#E1454E', '#9AB4E5', '#B663CE', '#D68959', '#C9B787', '#9BC430', '#646EBF', '#5599A4', '#FFA54F', '#60AADD', '#5DBD64', '#F6DA5A', '#FA8482', '#80D4C9', '#0874BF', '#646475', '#EF9AE2']

    aplicarColor(colores[tipos.indexOf(nombre)])

}

function aplicarColor(color) {
  const span = document.querySelectorAll('.info span')
  const root = document.documentElement
    span.forEach(elemento => {
    elemento.style.backgroundColor = color
    });

    root.style.setProperty('--meterColor', `${color}`)
}