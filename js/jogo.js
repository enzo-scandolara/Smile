    //declaraçao das variaveis globais
    let desempenho = 0;
    let tentativas = 0;
    let acertos = 0;
    let jogar = true;

    //captura os botoes pelos ids e adiciona um evento de clique
    const btnReiniciar = document.getElementById('reiniciar');
    const btnJogarNovamente = document.getElementById('joganovamente');

    //funçao que zera os valores das variáveis controladoras
    function reiniciar() {
      desempenho = 0;
      tentativas = 0;
      acertos = 0;
      jogar = true;
      jogarNovamente();
      atualizaPlacar(0, 0);
      //mostra o botao jogarnovamente alterando a classe css (className)
      btnJogarNovamente.className = 'visivel';
      //oculta o botao reiniciar alterando a classe css (className)
      btnReiniciar.className = 'invisivel';
    }

    //funçao jogar novamente
    function jogarNovamente() {
      jogar = true;//variável jogar volta a ser verdadeira
      //armazenamos todas as div na variável divis (getElementsByTagName)
      let divis = document.getElementsByTagName("div");
      //percorremos todas as divs armazenadas
      for (i = 0; i < divis.length; i++) {
        //verificamos se sao as divs com ids 0 ou 1 ou 2
        if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3) {
          //alteramos a classe css das divs 0, 1 e 2 (className)
          divis[i].className = "inicial";
        }
      }

      //armazenamos a imagem do Smile na variável imagem (getElementById)
      let imagem = document.getElementById("imagem");
      //se a imagem nao for vazia (se ela existir)
      if (imagem != "") {
        //removemos a imagem do Smile
        imagem.remove();
      }
      //armazenamos a imagem de erro na variáveç imagemErro
      let imagemErro = document.getElementById("imagemErro");
      if (imagemErro) {
        //removemos a imagem de erro
         imagemErro.remove();
      }

    }
      
    //funçao que atualiza o placar
    function atualizaPlacar(acertos, tentativas) {
      //calcula o desempenho em porcentagem
      desempenho = (acertos / tentativas) * 100;
      //escreve o placar com os valores atualizados (innerHTML)
      document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";

    }

    //funçao executada quando o jogador acertou
    function acertou(obj) {
      //altera a classe CSS da <div> escolhida pelo jogador (className)
      obj.className = "acertou";
      //Criar uma constante img que armazena um novo objeto imagem com largura de 100px
      const img = new Image(100);
      img.id = "imagem";
      //altera o atributo src (source) da imagem criada
      img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu9i_UyXqxtgu1kTn-Hon8AZ05rAV2flNeOg&s";
      //adiciona a imagem criada na div (obj) escolhida pelo jogador (appendChild)
      obj.appendChild(img);
    }

    // Função executada quando o jogador erra
  function errou(obj) {
    // Altera a classe CSS da <div> escolhida para a classe "errou"
    obj.className = "errou";
    // Criar uma constante img que armazena um novo objeto imagem com largura de 100px
    const img = new Image(100);
    img.id = "imagemErro"; // ID para controle
    //  Altera o atributo src da imagem criada para a imagem de erro
    img.src = "https://s2-ge.glbimg.com/E_Yg0-E3SNw6DRW8WXoHUavWUB0=/0x0:1600x1066/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2023/B/f/HcZNscR860TGXAguWDSg/whatsapp-image-2023-06-21-at-12.31.02.jpeg";
    // Adiciona a imagem na div escolhida pelo jogador (appendChild)
    obj.appendChild(img);
  }

    //Função que sorteia um número aleatório entre 0 e 2 e verifica se o jogador acertou
    function verifica(obj) {
      //se jogar é verdadeiro
      if (jogar) {
        //jogar passa a ser false
        jogar = false;
        //incrementa as tentativas
        tentativas++;
        //verifica se jogou 4 vezes
        if (tentativas == 4) {
          //oculta o botao joganovamente alterando a classe css (getElementById e className)
          btnJogarNovamente.className = 'invisivel';
          //mostra o botao reiniciar alterando a classe css (getElementById e className)
          btnReiniciar.className = 'visivel';
        }
        //a variável sorteado recebe um valor inteiro (Math.floor) aleatório (Math.random)
        let sorteado = Math.floor(Math.random() * 4);
        //se o id da <div> escolhida pelo jogador for igual ao número sorteado
        if (obj.id == sorteado) {
          //chama a funçao acertou passando a div escolhida pelo jogador
          acertou(obj);
          //incrementa o contador de acertos
          acertos++;
        } else {
          errou(obj); // Chama a função errou
          const objSorteado = document.getElementById(sorteado);
          acertou(objSorteado); // Mostra onde estava o Smile
        }
        
        //chama a funçao que atualiza o placar
        atualizaPlacar(acertos, tentativas);
      } else {//se o jogador clicar em outra carta sem reiniciar o jogo, recebe um alerta
        alert('Clique em "Jogar novamente"');
      }
    }

//adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);