import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  //  nossas variáveis e métodos
  userModel = new User()
  mensagem = ""

  receberDados() {
    console.log(this.userModel);

    const blackList = ["SELECT", "OR", ' ""="" ', "-- ", ";", "1 = 1", "1=1", "DROP", "\"\"=\"\"", "'='"];//lista de palavras chave
    let ataque = 0;

    blackList.forEach((palavra) => {
      if (this.userModel.email?.toUpperCase().includes(palavra)) {//encontrou sql injection
        ataque++;
      }
    });

    if (this.userModel.email == "" || this.userModel.password == "" || ataque > 0) {//campos vazios ou está sob ataque
      this.mensagem = "Preencher os campos corretamente";
    } else {// pode se logar 
      this.userService.logarUser(this.userModel).subscribe({
        next: (response) => {
          console.log("Tudo certo");
          console.log(response);
          this.mensagem = "Logado com sucesso";
          alert("Tudo certo");
        }, // quanto tiver sucesso

        error: (errado) => {
          console.log("Algo errado");
          console.log(errado);
          alert("Algo errado");
          this.mensagem = errado.error;
        } // quanto tiver erro
      })
      alert("Dados enviados!")
    }

  }
  teste() {
    this.userModel.email = "Iniciar registro"
  }
}
