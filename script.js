const feed = document.getElementById('feed');
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const toast = document.getElementById('toast');
const pinDialog = document.getElementById('pinDialog');
const createDialog = document.getElementById('createDialog');
let activeTopic = 'Todos';
let currentPin = null;
let profileMode = '';
let toastTimer;

const pins = [
 {id:1,title:'Cabelo azul com textura',topic:'estilo',description:'Inspiração de cabelo colorido e criativo.',image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=85',height:350},
 {id:2,title:'Look para sair com amigas',topic:'estilo',description:'Uma ideia de look para salvar e adaptar.',image:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=85'},
 {id:3,title:'Sorriso de infância',topic:'inspirações',description:'Momentos simples para guardar.',image:'https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=700&q=85'},
 {id:4,title:'Cabelo azul fantasia',topic:'fanarts',description:'Referência divertida para uma transformação de cabelo.',image:'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=700&q=85'},
 {id:5,title:'Cuidados com a pele',topic:'estilo',description:'Inspiração para organizar uma rotina de beleza.',image:'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=85'},
 {id:6,title:'Tênis preto esportivo',topic:'estilo',description:'Referência de tênis para um visual casual.',image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85'},
 {id:7,title:'Quarto neutro e elegante',topic:'casa',description:'Tons claros, luz natural e decoração delicada.',image:'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=85'},
 {id:8,title:'Inspiração de retrato',topic:'inspirações',description:'Retrato com luz natural.',image:'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=700&q=85'},
 {id:9,title:'Vestido branco de noiva',topic:'2026',description:'Inspiração de vestido para cerimônia.',image:'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=700&q=85'},
 {id:10,title:'Ideias de estudo',topic:'inspirações',description:'Uma mesa organizada para focar nos estudos.',image:'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=700&q=85'},
 {id:11,title:'Sala com madeira e plantas',topic:'casa',description:'Ambiente aconchegante com materiais naturais.',image:'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=85'},
 {id:12,title:'Arte azul e divertida',topic:'fanarts',description:'Cores fortes para um projeto criativo.',image:'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=700&q=85'},
 {id:13,title:'Decoração moderna',topic:'mansao',description:'Fachada contemporânea com iluminação.',image:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=85'},
 {id:14,title:'Look preto elegante',topic:'estilo',description:'Combinação básica para diferentes ocasiões.',image:'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85'},
 {id:15,title:'Oração para ter força',topic:'inspirações',description:'Uma pausa para respirar e renovar as energias.',image:'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=700&q=85'},
 {id:16,title:'Unhas decoradas',topic:'estilo',description:'Ideia de nail art delicada.',image:'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=700&q=85'},
 {id:17,title:'Café da manhã com luz natural',topic:'casa',description:'Inspiração para uma manhã tranquila.',image:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=85'},
 {id:18,title:'Roupa para praia',topic:'2026',description:'Look leve para dias de sol.',image:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=85'},
 {id:19,title:'Cabelo criativo infantil',topic:'fanarts',description:'Uma referência divertida e colorida.',image:'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=700&q=85'},
 {id:20,title:'Detalhes para casa nova',topic:'casa',description:'Pequenos detalhes que deixam o ambiente acolhedor.',image:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=700&q=85'},
 {id:21,title:'Inspiração para look 2026',topic:'2026',description:'Referência de estilo urbano.',image:'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=700&q=85'},
 {id:22,title:'Paisagem para sonhar',topic:'futury',description:'Uma paisagem para inspirar novas ideias.',image:'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=700&q=85'},
 {id:23,title:'Maquiagem iluminada',topic:'estilo',description:'Inspiração de maquiagem com pele iluminada.',image:'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=700&q=85'},
 {id:24,title:'Penteado para festa',topic:'estilo',description:'Ideia de penteado para uma ocasião especial.',image:'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=700&q=85'},
 {id:25,title:'Rotina de skincare',topic:'estilo',description:'Produtos e cuidados para inspirar sua rotina.',image:'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=85'},
 {id:26,title:'Look casual bege',topic:'estilo',description:'Combinação neutra e confortável para o dia a dia.',image:'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85'},
 {id:27,title:'Bolsa minimalista',topic:'estilo',description:'Acessório neutro para compor diferentes looks.',image:'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85'},
 {id:28,title:'Unhas delicadas',topic:'estilo',description:'Referência de unhas em tons suaves.',image:'https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=700&q=85'},
 {id:29,title:'Quarto aconchegante',topic:'casa',description:'Quarto claro com uma atmosfera tranquila.',image:'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=85'},
 {id:30,title:'Cozinha moderna',topic:'casa',description:'Inspiração de cozinha organizada e moderna.',image:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=85'},
 {id:31,title:'Sala com plantas',topic:'casa',description:'Plantas e luz natural para deixar a sala acolhedora.',image:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=85'},
 {id:32,title:'Cantinho de estudos',topic:'inspirações',description:'Uma mesa organizada para estudar com foco.',image:'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=85'},
 {id:33,title:'Planner semanal',topic:'inspirações',description:'Ideia para organizar compromissos e tarefas.',image:'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=700&q=85'},
 {id:34,title:'Café e livro',topic:'inspirações',description:'Um momento calmo para ler e descansar.',image:'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=700&q=85'},
 {id:35,title:'Flores cor-de-rosa',topic:'inspirações',description:'Flores para uma paleta romântica e delicada.',image:'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=85'},
 {id:36,title:'Pôr do sol na praia',topic:'futury',description:'Cores do céu no fim de tarde.',image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=85'},
 {id:37,title:'Montanhas e natureza',topic:'futury',description:'Paisagem para salvar como inspiração de viagem.',image:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=85'},
 {id:38,title:'Mar azul-turquesa',topic:'futury',description:'Uma paisagem tropical cheia de cor.',image:'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=700&q=85'},
 {id:39,title:'Viagem para Paris',topic:'2026',description:'Inspiração de viagem e arquitetura europeia.',image:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=700&q=85'},
 {id:40,title:'Ruas charmosas',topic:'2026',description:'Arquitetura e ruas para colocar na lista de viagens.',image:'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=85'},
 {id:41,title:'Receita de panquecas',topic:'casa',description:'Ideia de café da manhã para experimentar.',image:'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=700&q=85'},
 {id:42,title:'Morango com chocolate',topic:'casa',description:'Inspiração doce para sobremesas.',image:'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=700&q=85'},
 {id:43,title:'Mesa posta elegante',topic:'casa',description:'Mesa preparada com detalhes delicados.',image:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=700&q=85'},
 {id:44,title:'Arte abstrata colorida',topic:'fanarts',description:'Cores e formas para inspirar projetos criativos.',image:'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=700&q=85'},
 {id:45,title:'Desenho em aquarela',topic:'fanarts',description:'Referência artística com cores suaves.',image:'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=700&q=85'},
 {id:46,title:'Ideia para tatuagem floral',topic:'fanarts',description:'Inspiração de arte floral delicada.',image:'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=700&q=85'},
 {id:47,title:'Tênis para academia',topic:'estilo',description:'Referência de tênis esportivo para treinar.',image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85'},
 {id:48,title:'Treino ao ar livre',topic:'inspirações',description:'Motivação para se movimentar e cuidar de si.',image:'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=700&q=85'},
 {id:49,title:'Moda urbana',topic:'estilo',description:'Inspiração de moda urbana e casual.',image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=85'},
 {id:50,title:'Vestido para verão',topic:'estilo',description:'Look leve para dias ensolarados.',image:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=85'},
 {id:51,title:'Decoração com madeira',topic:'casa',description:'Texturas naturais em um ambiente moderno.',image:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=85'},
 {id:52,title:'Sala minimalista',topic:'casa',description:'Decoração minimalista em tons neutros.',image:'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=85'},
 {id:53,title:'Cachorro fofo',topic:'inspirações',description:'Uma imagem fofa para alegrar seu mural.',image:'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=700&q=85'},
 {id:54,title:'Gato descansando',topic:'inspirações',description:'Um momento tranquilo de um gatinho.',image:'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=700&q=85'},
 {id:55,title:'Flores no jardim',topic:'casa',description:'Inspiração de jardim com flores coloridas.',image:'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=700&q=85'},
 {id:56,title:'Fotografia de cidade',topic:'2026',description:'Arquitetura urbana para inspirar novas ideias.',image:'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=700&q=85'},
 {id:57,title:'Look preto e branco',topic:'estilo',description:'Combinação clássica para um visual versátil.',image:'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=700&q=85'},
 {id:58,title:'Montagem de moodboard',topic:'fanarts',description:'Uma referência para montar seu próprio painel de ideias.',image:'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=700&q=85'},
 {id:59,title:'Piquenique ao ar livre',topic:'casa',description:'Ideia de encontro simples em um parque.',image:'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=700&q=85'},
 {id:60,title:'Arquitetura contemporânea',topic:'mansao',description:'Fachada com linhas modernas e grandes janelas.',image:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=700&q=85'},
];

function getSaved(){try{return JSON.parse(localStorage.getItem('marianaPinterestSaved')||'[]')}catch{return []}}
function setSaved(value){localStorage.setItem('marianaPinterestSaved',JSON.stringify(value))}
function notify(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2400)}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

function render(){
 const query=searchInput.value.trim().toLocaleLowerCase('pt-BR');
 let filtered=pins.filter(p=>{
   const topicMatch=activeTopic==='Todos'||p.topic===activeTopic|| (activeTopic==='2026look'&&p.topic==='2026') || (activeTopic==='decor'&&p.topic==='casa') || (activeTopic==='mansao'&&p.topic==='mansao');
   const queryMatch=!query||`${p.title} ${p.description} ${p.topic}`.toLocaleLowerCase('pt-BR').includes(query);
   return topicMatch&&queryMatch;
 });
 const savedOnly=activeTopic==='Salvos' || profileMode==='saved';
 if(savedOnly){const ids=getSaved();filtered=pins.filter(p=>ids.includes(p.id))}
 if(profileMode==='created'){filtered=pins.filter(p=>p.created===true)}
 feed.innerHTML='';
 document.getElementById('profileStats').textContent=`${getSaved().length} Pins salvos`;
 document.getElementById('emptyState').querySelector('h2').textContent=profileMode==='saved'?'Você ainda não salvou nenhum Pin':'Nenhum Pin criado ainda';
 document.getElementById('emptyState').querySelector('p').textContent=profileMode==='saved'?'Quando salvar imagens, elas aparecerão aqui.':'Os Pins que você criar aparecerão nesta seção.';
 filtered.forEach(pin=>{
   const saved=getSaved().includes(pin.id);
   const article=document.createElement('article');
   article.className='pin';
   article.innerHTML=`<img src="${escapeHTML(pin.image)}" alt="${escapeHTML(pin.title)}" loading="lazy"><div class="pin-hover"><button class="pin-save" data-save="${pin.id}">${saved?'Salvo ✓':'Salvar'}</button></div><button class="pin-more" data-more="${pin.id}" aria-label="Mais opções">•••</button><div class="pin-caption">${escapeHTML(pin.title)}</div>`;
   article.addEventListener('click',e=>{if(e.target.closest('button'))return;openPin(pin.id)});
   article.querySelector('[data-save]').addEventListener('click',e=>{e.stopPropagation();toggleSave(pin.id)});
   article.querySelector('[data-more]').addEventListener('click',e=>{e.stopPropagation();openPin(pin.id)});
   article.querySelector('img').addEventListener('error',e=>{e.currentTarget.style.minHeight='160px';e.currentTarget.style.background='linear-gradient(135deg,#e9d7ca,#9bb9c8,#d6c4dd)';e.currentTarget.removeAttribute('src')},{once:true});
   feed.appendChild(article);
 });
 document.getElementById('emptyState').hidden=filtered.length>0;
 clearSearch.classList.toggle('show',!!searchInput.value);
}
function toggleSave(id){
 const saved=getSaved();
 const next=saved.includes(id)?saved.filter(n=>n!==id):[...saved,id];
 setSaved(next);render();
 if(currentPin&&currentPin.id===id)document.getElementById('dialogSave').textContent=next.includes(id)?'Salvo ✓':'Salvar';
 notify(next.includes(id)?'Pin salvo na sua coleção':'Pin removido dos salvos');
}
function openPin(id){
 const pin=pins.find(p=>p.id===id);if(!pin)return;currentPin=pin;
 document.getElementById('dialogImage').src=pin.image;
 document.getElementById('dialogImage').alt=pin.title;
 document.getElementById('dialogTitle').textContent=pin.title;
 document.getElementById('dialogDescription').textContent=pin.description;
 document.getElementById('dialogSave').textContent=getSaved().includes(id)?'Salvo ✓':'Salvar';
 document.getElementById('commentInput').value='';
 document.getElementById('comments').innerHTML='';
 pinDialog.showModal();
}
document.getElementById('dialogSave').addEventListener('click',()=>currentPin&&toggleSave(currentPin.id));
document.getElementById('closeDialog').addEventListener('click',()=>pinDialog.close());
pinDialog.addEventListener('click',e=>{if(e.target===pinDialog)pinDialog.close()});
document.getElementById('sharePin').addEventListener('click',async()=>{
 if(!currentPin)return;
 try{await navigator.clipboard.writeText(currentPin.title+' — '+currentPin.image);notify('Link do Pin copiado!')}
 catch{notify('Pin: '+currentPin.title)}
});
document.getElementById('sendComment').addEventListener('click',()=>{
 const input=document.getElementById('commentInput');const value=input.value.trim();if(!value)return;
 const item=document.createElement('div');item.className='comment-item';item.textContent=value;document.getElementById('comments').appendChild(item);input.value='';
});
searchInput.addEventListener('input',render);
clearSearch.addEventListener('click',()=>{searchInput.value='';render();searchInput.focus()});

document.querySelectorAll('.topic').forEach(btn=>btn.addEventListener('click',()=>{
 hideProfile();
 document.querySelectorAll('.topic').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
 activeTopic=btn.dataset.topic;render();
}));
function showProfile(mode='saved'){
 profileMode=mode;
 document.getElementById('profilePage').hidden=false;
 document.getElementById('feedWrap').hidden=false;
 document.querySelector('.topic-row').style.display='none';
 document.getElementById('profilePage').scrollIntoView({behavior:'smooth',block:'start'});
 document.querySelectorAll('.profile-tab').forEach(tab=>tab.classList.toggle('active',tab.dataset.profileTab===mode));
 searchInput.value='';
 render();
}
function hideProfile(){profileMode='';document.getElementById('profilePage').hidden=true;document.querySelector('.topic-row').style.display='flex';}
document.querySelectorAll('.profile-tab').forEach(tab=>tab.addEventListener('click',()=>showProfile(tab.dataset.profileTab)));

document.querySelectorAll('[data-view]').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.side-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
 const view=btn.dataset.view;
 if(view==='create'){createDialog.showModal();return}
 if(view==='home'){hideProfile();activeTopic='Todos';document.querySelectorAll('.topic').forEach(b=>b.classList.toggle('active',b.dataset.topic==='Todos'));searchInput.value='';render();window.scrollTo({top:0,behavior:'smooth'});return}
 if(view==='explore'){hideProfile();activeTopic='Todos';searchInput.value='';render();notify('Explore ideias: use os tópicos ou a pesquisa');return}
 if(view==='notifications')notify('Você está em dia! Nenhuma notificação nova.');
 if(view==='messages')notify('Mensagens demonstrativas: nada por aqui ainda.');
}));
document.getElementById('profileBtn').addEventListener('click',()=>showProfile('saved'));
document.getElementById('profileMenu').addEventListener('click',()=>showProfile('saved'));
document.getElementById('settingsBtn').addEventListener('click',()=>notify('Configurações da demonstração'));

document.getElementById('visualSearch').addEventListener('click',()=>{
 const q=prompt('Pesquisa visual demonstrativa: descreva o que você quer encontrar');
 if(q!==null){searchInput.value=q;render();searchInput.focus()}
});
document.getElementById('closeCreate').addEventListener('click',()=>createDialog.close());
createDialog.addEventListener('click',e=>{if(e.target===createDialog)createDialog.close()});
document.getElementById('createForm').addEventListener('submit',e=>{
 e.preventDefault();
 const image=document.getElementById('newImage').value.trim();
 const title=document.getElementById('newTitle').value.trim();
 const description=document.getElementById('newDescription').value.trim();
 const topic=document.getElementById('newTopic').value;
 if(!image||!title)return;
 pins.unshift({id:Date.now(),title,description:description||'Pin criado por Mariana.',topic,image,created:true});
 createDialog.close();e.target.reset();hideProfile();activeTopic='Todos';document.querySelectorAll('.topic').forEach(b=>b.classList.toggle('active',b.dataset.topic==='Todos'));searchInput.value='';render();notify('Seu Pin foi publicado nesta demonstração');
});
render();
