    ALPHA = 'abcdefghijklmnopqrstuvwxyz'.split('');
    function letterIndexArray(word){
      return word.split('').map(function(char){
        return ALPHA.indexOf(char);
      });
    }
    function incrementArray(indexArray){
      indexArrayLength = indexArray.length;
      lastIndex = indexArray[indexArrayLength-1];
      allOtherIndexs = indexArray.slice(0,indexArrayLength-1);
      if(lastIndex == 25){
        return incrementArray(allOtherIndexs).concat([lastIndex]);
      }else{
        return allOtherIndexs.concat([lastIndex + 1]);
      }
    }
    function indexArrayWord(indexArray){
      return indexArray.map(function(index){
        return ALPHA[index]
      }).join('');
    }

    function incrementElementText(node){
      text = node.innerText;
      wordArray = text.split(' ');
      lastWord = wordArray[wordArray.length-1];
      firstLetterLastWord = lastWord[0];
      lastLettersLastWord = lastWord.slice(1,lastWord.length);
      firstWords = wordArray.slice(0,wordArray.length-1);
      indexArray = letterIndexArray(lastLettersLastWord);
      indexArray = incrementArray(indexArray);
      newLastLettersLastWord = indexArrayWord(indexArray);
      newText = firstWords.join(' ').concat(' ').concat(firstLetterLastWord.concat(newLastLettersLastWord))
      node.innerText = newText;
    }
    function incrementInterval(node){
        nodeText = node.innerText
        i = 1;
        id = setInterval(function(){
        incrementElementText(node);        
        incrementElementText(node); 
        i++;
        if(i == 750){
          clearInterval(id);
          node.innerText = nodeText
        }
        },1);
    }
    node = document.querySelector('#title');
    incrementInterval(node);