Projekat iz predmeta Razvoj Veb Aplikacija

Full-stack veb aplikacija za rezervaciju smeštaja u Srbiji ("projekat-hotel") podeljena na frontend i 
backend deo. Podatke o hotelima preuzima iz OpenStreetMap Overpass API-ja. Koristi MySQL kao bazu 
podataka ("hotels_db") i sadrži tri tabele ("hotels", "reservation", "user") koje zajedno čine relacionu 
bazu.
Softverski preduslovi: 
• Instaliran Node.js na računaru 
• Pokrenut MySQL server 
Korišćene tehnologije: 
Frontend ("projekat-hotel-frontend"): 
• Framework: Vue.js 
• Jezik: TypeScript 
• Alat: Vite 
• Stilizovanje: Bootstrap 5, FontAwesome, CSS 
Backend ("projekat-hotel-backend"): 
• Runtime environment, framework: Node.js, Express.js 
• Jezik: TypeScript 
• Baza podataka i ORM: MySQL Workbench, TypeORM 
• API: OpenStreetMap Overpass API 
Aplikacija koristi relacionu MySQL bazu podataka, dok se mapiranje tabela i upravljanje entitetima vrši 
pomoću TypeORM-a. 
1. Tabela "User"
• User_id (primarni ključ / int (10))
• Email (jedinstveni identifikator za prijavu / varchar (255))
• Password (heširana lozinka radi bezbednosti / varchar (255))
• Created_at (vreme kreiranja rezervacije / datetime)
2. Tabela "Hotel"
• Hotel_id (primarni kljuc / int (10))
• Name (naziv hotela / varchar (255))
• City (grad u kome se hotel nalazi / varchar (255))
• Latitude, longitude (geografske koordinate / float)
3. Tabela "Reservation"
• Reservation_id (primarni kljuc / int (10))
• Hotel_id (spoljni ključ preko koga je tabela povezana za tabelom "hotel" / int (10))
• User_id (spoljni ključ preko koga je tabela povezana sa tabelom "user" / int (10))
• CheckIn, checkOut (vreme prijave i odjave iz hotela / date)
• Created_at (vreme kreiranja naloga / datetime)
• Deleted_at (vreme brisanja naloga / datetime)
Iz API-ja su preuzeti nazivi hotela, njihove lokacije, longitude i latitude (tako da je omogućen precizan 
prikaz na interaktivnoj mapi).
API nije sadržao fotografije hotela pa se one nasumično biraju sa https://picsum.photos/ sajta.
Podacima je moguće efikasno upravljati (korisnici, hoteli, rezervacije) putem TypeORM-a i MySQL 
relacione baze podataka (CRUD nad podacima).
Omogućena je registracija novih naloga i prijava na već postojeće kako bi se uspešno rezervisao smeštaj, 
kao i odjava.
