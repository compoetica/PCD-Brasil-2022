celulas = [
  // function(brilho, bounds) {
  //   //  brilho - varia entre 0-1. é o valor de luminosidade da célula
  //   //
  //   //  bounds contem:
  //   //
  //   //  bounds.x , bounds.y - posição do canto superior esquerdo
  //   //  ↓
  //   //  ┏━━━━━━━━━━━━━━━━━━━━━┓
  //   //  ┃                     ┃
  //   //  ┃                     ┃
  //   //  ┃                     ┃
  //   //  ┃                     ┃ bounds.h - altura da celula
  //   //  ┃                     ┃
  //   //  ┃                     ┃
  //   //  ┃                     ┃
  //   //  ┗━━━━━━━━━━━━━━━━━━━━━┛
  //   //          bounds.w - largura da celulas
  //
  //
  //
  //   this.atualiza = function(tempoAnima) {
  //     //  essa função é chamada a cada frame. Aqui você pode alterar o desenho da sua célula conforme o tempoAnima.
  //     //  tempoAnima varia de 0-1 conforme o tempo da animação. 0 - primeiro frame, 0.5 - metade da animação, 1 - fim da animação
  //     //  idealmente, a celula fica 100% acesa e no seu quadrado a maior parte do tempo - pra textura manter consistencia durante boa parte do tempo
  //     //
  //   }
  //
  //   this.desenha = function() {
  //     //  aqui você desenha sua célula
  //     //  use cor_shape no desenho das suas formas
  //
  //   }
  //
  //   this.salva = function(c) {
  //     //  essa função é uma cópia do desenha()
  //     //  fill(corShape) vira -> c.fill(corShape)
  //
  //   }
  // },

  function(brilho, bounds) { // QUADRADO PRETO NO FUNDO BRANCO
    this.brilhoOrig = 1 - brilho
    this.bounds = bounds

    //DAQUI PRA BAIXO É FIRULA
    this.pos0 = createVector(this.bounds.x + round(this.bounds.w * 0.5), this.bounds.y + round(this.bounds.h * 0.5))
    this.brilhoAtual = 0
    this.tIntro = random(0.1, 0.25)
    this.tOutro = random(0.1, 0.4)

    this.atualiza = function(tempoAnima) { // função pra atualizar sua celula
      if (tempoAnima < this.tIntro) {
        this.brilhoAtual = map(tempoAnima, 0, this.tIntro, 1, this.brilhoOrig)
      } else if (tempoAnima > 1 - this.tOutro) {
        this.brilhoAtual = map(tempoAnima, 1 - this.tOutro, 1, this.brilhoOrig, 1)
      } else this.brilhoAtual = this.brilhoOrig
    }

    this.desenha = function() { // função pra desenhar sua celula
      noStroke()
      fill(cor_shape)
      beginShape()
      vertex(this.bounds.x, this.bounds.y)
      vertex(this.bounds.x + this.bounds.w, this.bounds.y)
      vertex(this.bounds.x + this.bounds.w, this.bounds.y + this.bounds.h)
      vertex(this.bounds.x, this.bounds.y + this.bounds.h)
      beginContour()
      let wBuraco = this.bounds.w * 0.5 * this.brilhoAtual
      let hBuraco = this.bounds.h * 0.5 * this.brilhoAtual
      vertex(this.pos0.x - wBuraco, this.pos0.y - hBuraco)
      vertex(this.pos0.x - wBuraco, this.pos0.y + hBuraco)
      vertex(this.pos0.x + wBuraco, this.pos0.y + hBuraco)
      vertex(this.pos0.x + wBuraco, this.pos0.y - hBuraco)
      endContour()
      endShape()
    }

    this.salva = function(c) { // copia da funçao desenha, mas desenhando em um canvas c
      c.noStroke()
      c.fill(cor_shape)
      c.beginShape()
      c.vertex(this.bounds.x, this.bounds.y)
      c.vertex(this.bounds.x + this.bounds.w, this.bounds.y)
      c.vertex(this.bounds.x + this.bounds.w, this.bounds.y + this.bounds.h)
      c.vertex(this.bounds.x, this.bounds.y + this.bounds.h)
      c.beginContour()
      let wBuraco = this.bounds.w * 0.5 * this.brilhoAtual
      let hBuraco = this.bounds.h * 0.5 * this.brilhoAtual
      c.vertex(this.pos0.x - wBuraco, this.pos0.y - hBuraco)
      c.vertex(this.pos0.x - wBuraco, this.pos0.y + hBuraco)
      c.vertex(this.pos0.x + wBuraco, this.pos0.y + hBuraco)
      c.vertex(this.pos0.x + wBuraco, this.pos0.y - hBuraco)
      c.endContour()
      c.endShape()
    }
  },

  function(brilho, bounds) { // QUADRADO INTERPOLA ENTRE BRANCO E PRETO?
    this.brilhoOrig = brilho
    this.bounds = bounds
    this.pos0 = createVector(this.bounds.x + round(this.bounds.w * 0.5), this.bounds.y + round(this.bounds.h * 0.5))

    //DAQUI PRA BAIXO É FIRULA
    this.brilhoAtual = 0
    this.tIntro = random(0.1, 0.25)
    this.tOutro = random(0.1, 0.4)
    this.direcao = floor(random(4))

    this.atualiza = function(tempoAnima) { // função pra atualizar sua celula
      if (tempoAnima < this.tIntro) {
        this.brilhoAtual = map(tempoAnima, 0, this.tIntro, 0, this.brilhoOrig)
      } else if (tempoAnima > 1 - this.tOutro) {
        this.brilhoAtual = map(tempoAnima, 1 - this.tOutro, 1, this.brilhoOrig, 0)
      } else this.brilhoAtual = this.brilhoOrig
    }

    this.desenha = function() { // função pra desenhar sua celula
      noStroke()
      fill(cor_shape)
      if (this.direcao == 0) {
        rect(this.bounds.x, this.bounds.y, this.bounds.w * this.brilhoAtual, this.bounds.h)
      } else if (this.direcao == 1) {
        rect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h * this.brilhoAtual)
      } else if (this.direcao == 2) {
        let w = this.bounds.w * this.brilhoAtual
        rect(this.bounds.x + (this.bounds.w - w), this.bounds.y, w, this.bounds.h)
      } else if (this.direcao == 3) {
        let h = this.bounds.h * this.brilhoAtual
        rect(this.bounds.x, this.bounds.y + (this.bounds.h - h), this.bounds.w, h)
      }
    }

    this.salva = function(c) { // copia da funçao desenha, mas desenhando em um canvas c
      c.noStroke()
      c.fill(cor_shape)
      if (this.direcao == 0) {
        c.rect(this.bounds.x, this.bounds.y, this.bounds.w * this.brilhoAtual, this.bounds.h)
      } else if (this.direcao == 1) {
        c.rect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h * this.brilhoAtual)
      } else if (this.direcao == 2) {
        let w = this.bounds.w * this.brilhoAtual
        c.rect(this.bounds.x + (this.bounds.w - w), this.bounds.y, w, this.bounds.h)
      } else if (this.direcao == 3) {
        let h = this.bounds.h * this.brilhoAtual
        c.rect(this.bounds.x, this.bounds.y + (this.bounds.h - h), this.bounds.w, h)
      }
    }
  },

  function(brilho, bounds) { // QUADRADO INTERPOLA ENTRE BRANCO E PRETO 2?
    this.brilhoOrig = brilho
    this.bounds = bounds
    this.pos0 = createVector(this.bounds.x + round(this.bounds.w * 0.5), this.bounds.y + round(this.bounds.h * 0.5))

    //DAQUI PRA BAIXO É FIRULA
    this.brilhoAtual = 0
    this.tIntro = random(0.1, 0.25)
    this.tOutro = random(0.1, 0.4)
    this.direcao = floor(random(4))
    // this.d = this.bounds.w*0.5
    // this.pos1 = createVector(this.bounds.x, this.bounds.y)
    // this.pos2 = createVector(this.bounds.x + this.bounds.w, this.bounds.y + this.bounds.h)
    this.x2 = this.bounds.x + this.bounds.w
    this.y2 = this.bounds.y + this.bounds.h

    this.atualiza = function(tempoAnima) { // função pra atualizar sua celula
      if (tempoAnima < this.tIntro) {
        this.brilhoAtual = map(tempoAnima, 0, this.tIntro, 0, this.brilhoOrig)
      } else if (tempoAnima > 1 - this.tOutro) {
        this.brilhoAtual = map(tempoAnima, 1 - this.tOutro, 1, this.brilhoOrig, 0)
      } else this.brilhoAtual = this.brilhoOrig
    }

    this.desenha = function() { // função pra desenhar sua celula
      // stroke(0)
      noStroke()
      // fill(255,0,0)
      // rectMode(CENTER)
      // rect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h)
      fill(cor_shape)
      if (this.direcao == 0) {
        beginShape()
        vertex(this.bounds.x, this.bounds.y)
        vertex(this.bounds.x, this.y2)
        vertex(lerp(this.bounds.x, this.x2, this.brilhoAtual), lerp(this.bounds.y, this.y2, this.brilhoAtual))
        vertex(this.x2, this.bounds.y)
        endShape(CLOSE)
        // rect(this.bounds.x, this.bounds.y, this.bounds.w*this.brilhoAtual, this.bounds.h)
      } else if (this.direcao == 1) {
        beginShape()

        vertex(this.bounds.x, this.y2)
        vertex(this.x2, this.y2)
        vertex(lerp(this.bounds.x, this.x2, this.brilhoAtual), lerp(this.y2, this.bounds.y, this.brilhoAtual))
        vertex(this.bounds.x, this.bounds.y)
        endShape(CLOSE)
      } else if (this.direcao == 2) {
        beginShape()
        vertex(this.x2, this.y2)
        vertex(this.bounds.x, this.y2)
        vertex(lerp(this.x2, this.bounds.x, this.brilhoAtual), lerp(this.y2, this.bounds.y, this.brilhoAtual))
        vertex(this.x2, this.bounds.y)
        endShape(CLOSE)
      } else if (this.direcao == 3) {
        beginShape()
        vertex(this.bounds.x, this.y2)
        vertex(this.bounds.x, this.bounds.y)
        vertex(lerp(this.bounds.x, this.x2, this.brilhoAtual), lerp(this.y2, this.bounds.y, this.brilhoAtual))
        vertex(this.x2, this.y2)
        endShape(CLOSE)
      }
    }

    this.salva = function(c) { // copia da funçao desenha, mas desenhando em um canvas c
      c.noStroke()
      c.fill(cor_shape)
      if (this.direcao == 0) {
        c.beginShape()
        c.vertex(this.bounds.x, this.bounds.y)
        c.vertex(this.bounds.x, this.y2)
        c.vertex(lerp(this.bounds.x, this.x2, this.brilhoAtual), lerp(this.bounds.y, this.y2, this.brilhoAtual))
        c.vertex(this.x2, this.bounds.y)
        c.endShape(CLOSE)
        // rect(this.bounds.x, this.bounds.y, this.bounds.w*this.brilhoAtual, this.bounds.h)
      } else if (this.direcao == 1) {
        c.beginShape()

        c.vertex(this.bounds.x, this.y2)
        c.vertex(this.x2, this.y2)
        c.vertex(lerp(this.bounds.x, this.x2, this.brilhoAtual), lerp(this.y2, this.bounds.y, this.brilhoAtual))
        c.vertex(this.bounds.x, this.bounds.y)
        c.endShape(CLOSE)
      } else if (this.direcao == 2) {
        c.beginShape()
        c.vertex(this.x2, this.y2)
        c.vertex(this.bounds.x, this.y2)
        c.vertex(lerp(this.x2, this.bounds.x, this.brilhoAtual), lerp(this.y2, this.bounds.y, this.brilhoAtual))
        c.vertex(this.x2, this.bounds.y)
        c.endShape(CLOSE)
      } else if (this.direcao == 3) {
        c.beginShape()
        c.vertex(this.bounds.x, this.y2)
        c.vertex(this.bounds.x, this.bounds.y)
        c.vertex(lerp(this.bounds.x, this.x2, this.brilhoAtual), lerp(this.y2, this.bounds.y, this.brilhoAtual))
        c.vertex(this.x2, this.y2)
        c.endShape(CLOSE)
      }
    }
  }
  
  
]
