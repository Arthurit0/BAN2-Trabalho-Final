import { Autor, Musico, Banda } from './models/Autor';
import Endereco from "./models/Endereco";
import Instrumento from "./models/Instrumento";
import Musica from './models/Musica';
import Produtor from './models/Produtor';
import Studio from './models/Studio';



document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário
  
    // Obtem os valores dos campos
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
  
    // Aqui você pode enviar os dados para o backend em TypeScript para serem salvos no banco de dados
    console.log("Nome: " + name + "\nE-mail: " + email + "\nMensagem: " + message);
  
    // Limpa os campos após o envio
    document.getElementById("myForm").reset();
  });
  

function criaInstrumento(){
    let instrumento = new Instrumento()
    instrumento.cdInstr = '1234';
    instrumento.nmInstr = 'Guitarra';
    instrumento.cdStudio = 987
    instrumento.tipInstr = 'Cordas'
}
// autor não recebe funcao por ter só um dado 
// e esse dado estar em banda e musico
function criaMusico(){
  let musico = new Musico()
  musico.cdAutor = '2345'
  musico.cdEnd = 4323
  musico.nmArtistico ='Robesvaldo'
  musico.nmMusico = 'Joao'
  musico.nrReg = '4365'
}
function criaBanda(){
  let banda = new Banda()
  banda.cdAutor ='3425'
  banda.cdBanda = '999'
  banda.dtFormacao = '10/12/1994'
  banda.nmBanda = 'Os Fanfarroes'
}
function criaEndereco(){
  let endereco = new Endereco()
  endereco.cdEnd = '5678'
  endereco.dsTelefone = '93 8505-6844'
  endereco.nmBairro = 'Centro'
  endereco.nmCidade = 'Lages'
  endereco.nmEstado = 'Santa Catarina'
  endereco.nmPais = 'Brasil'
  endereco.nmRua = 'Rua Osvaldo crus'
  endereco.nrCasa =   65
}
function criaMusica(){
  let musica = new Musica()
  musica.cdMusica = '7654'
  musica.ds_titulo = 'Beterraba Maluca'
  musica.fmtArquivo = 'MKV'
  musica.tpDuracao = 3.34
}
 
function criaProdutor(){
  let produtor = new Produtor()
  produtor.cdEnd = 5434
  produtor.cdProd = '2354'
  produtor.dnmProdutor = 'Polenta'
  produtor.nmEmpresa = 'oxMusic'
}
function criaStudio(){
  let studio = new Studio()
  studio.cdEndereco =  4323
  studio.cdStudio = 3759
  studio.nmStudio = 'Bela Flora'
}