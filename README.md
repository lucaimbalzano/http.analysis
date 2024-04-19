# Coding Challenge
<img src="https://github.com/lucaimbalzano/http.analysis/assets/45575898/919994af-7544-4edb-add3-4d4f8257b3a7" width="800" height="700" />
<img src="https://github.com/lucaimbalzano/http.analysis/assets/45575898/30b5e2bf-3655-432c-ad35-b502108a4b46" width="380" height="700" />


## Coding Challenge - Azienda X
- Prima di iniziare il test, leggilo fino alla fine, poiché alcune parti sono pensate per ambito di sviluppo (back-end e front-end) e per seniority.
- Assicurati di eseguire tutto ciò che ti riguarda.

### Descrizione
Sviluppare un'applicazione web che permetta di creare richieste HTTP e di analizzare poi le risposte, ricevendo informazioni anche sull'analisi dell'URL. Applicazione che salva tutte le richieste e le relative risposte in un database i cui dati possono essere poi sfogliati attraverso una pagina che prende nell'URL l'id della richiesta.
- Dettagli
Ecco come si presenta la homepage dopo che l'utente ha inviato le informazioni attraverso il form. In cima troviamo lo status code della richiesta HTTP. Poco più in basso una breve descrizione dello status code. Al centro della pagina un input con a sinistra un select che contiene i vari metodi HTTP, mentre a destra troviamo un pulsante di submit. Più in basso troviamo tre blocchi. Il primo: mostra i dettagli sull'URL inserito. Gli altri due mostrano le informazioni per ogni richiesta HTTP. Nell'esempio specifico, una richiesta HTTP all'indirizzo inserito nella barra è risultato in un 302 redirect, quindi troviamo 2 blocchi di richieste. Infine troviamo il link alla pagina che fa riferimento alla pagina di informazioni della richiesta appena inviata
Questa è la pagina che fa riferimento al link sotto la scritta SHARE.

- Back-end
Se sei uno sviluppatore front-end ignora pure lo sviluppo back-end. Utilizza un sistema di json hosting come, per esempio, http://myjson.com per salvare il tuo array di dati.
Sviluppo di API. End Points
Per ogni metodo (GET, POST, PUT, DELETE, INFO,DUMB)
Esempio di output:
/api/HTTP/{METHOD}/{?json}
```
{
"status": 200,
"errors": {},
"data": {
"url": {
},
"response":
{
},
"request": {
}
}
}
```
Almeno: Mid-level
- Proteggi gli endpoints da attacchi CSRF
- Proteggi il database da attacchi DDOS
Senior
- Limita l'utilizzo dell'API per utente anonimo basandoti sull'IP
- Scrivi i test
Front-end
- Riproduci le pagine allegate.
Regole:
- Utilizza SCSS/SASS
- Utilizza Angular/Vue.js
- Non utilizzare Jquery
- Prediligi sempre il CSS a Javascript dove necessario
- Ragiona sempre mobile first
- Puoi utilizzare un framework CSS

