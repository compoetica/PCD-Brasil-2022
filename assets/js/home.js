p5.disableFriendlyErrors = true; // disables FES

let cor_shape;
let grade_A;
let grade_B;
let velocidade;
let celula_qtd;
let fRate;


function setup() {
  let cvn = createCanvas(windowWidth, windowHeight);
  cvn.parent("canvas-container");

  if (navigator.userAgent.indexOf("Firefox") != -1 ) {
    velocidade = 20;
    celula_qtd = 8;
    fRate = 10;
  } else {
    velocidade = 120;
    celula_qtd = 16;
    fRate = 24;
  }

  frameRate(fRate);
  grade_A = [];
  grade_B = [];
  grade_iniciliza(grade_A, celula_qtd);
  grade_iniciliza(grade_B, celula_qtd/2);
}

function draw() {
  clear();
  background("#FFFAF2");
  blendMode(MULTIPLY);
  cor_shape = color("#57D8BA");
  grade_desenha(grade_A);
  cor_shape = color("#CC36C1");
  grade_desenha(grade_B);
}

function grade_iniciliza(grade_a, qtd) {
  let qtd_x = qtd;
  let tamanho = width/qtd_x;
  let qtd_y = ceil(height/tamanho);
 
  for(let j = 0; j < qtd_y; j++) {
    for(let i = 0; i < qtd_x; i++) {
      let bounds = {
        x: i * tamanho,
        y: j * tamanho,
        h: tamanho,
        w: tamanho
      }
      let index = i + j * tamanho;
      let index_celulas = floor(index % celulas.length);
      grade_a.push(new celulas[index_celulas](random(1), bounds));
    }
  }
}

function grade_desenha(grade_a) {
  // let d = dist(c.bounds.x, c.bounds.y, mouseX, mouseY);
  let tempoAnima = map(Math.sin((frameCount)/velocidade), -1, 1, 0, 1);
  let balizador = Math.max(width, height) * 2;
  grade_a.forEach(c => {
    d = dist(c.bounds.x, c.bounds.y, mouseX, mouseY);
    push();
    c.atualiza(tempoAnima * (d/balizador));
    c.desenha();
    pop();
  });

}