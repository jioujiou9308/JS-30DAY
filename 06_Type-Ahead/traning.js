//  String.prototype.match()
const paragraph = 'The quick Brown fox jumps over the lazy dog. It barked.';
const regex = /[A-Z]/g;
const found = paragraph.match(regex);
//[ 'T', 'B', 'I' ] 只映出大寫
// console.log(found);

// String.prototype.replace()
const p ='The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?'
// console.log(p.replace('dog','monkey'));

const regex2 = /Dog/gi;
// console.log(p.replace(regex2,'lion'));

//-------------------------------------
// 使用fetch 發送請求(request )
// fetch('url')
//     .then(function(response){
//         return response.data
//     })
//     .then(function(myJson){
//         console.log(myJson);
//     })

const city = ['taiwan','china']

function hi(say,city){

    console.log(say + city);
}

hi(city,city)