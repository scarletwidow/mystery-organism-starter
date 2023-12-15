// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const randomBase = Math.floor(Math.random() * 15);

//Factory organism function
const pAequorFactory = (_specimenNum, _dna) => {
  return {
    _specimenNum,
    _dna,
    mutate() {
      const randomBase = Math.floor(Math.random() * this._dna.length);
      let diffBase = returnRandBase();
      while (this._dna[randomBase] === diffBase){
        diffBase = returnRandBase();
      }
      this._dna[randomBase] = diffBase;
      return this._dna;
    },
    compareDna(pAequorObj) {
      let basesInCommon = 0;
        if(this._dna.length !== pAequorObj._dna.length){
          return `Input error`
        } else {
          for(let i = 0; i < this._dna.length; i++){
            if(this._dna[i] === pAequorObj._dna[i]) {
              basesInCommon += 1;
            }
          }
          const dnaInCommon = Math.round((basesInCommon / 15) *100);
          return `specimen # ${this._specimenNum} and specimen # ${pAequorObj._specimenNum} have ${dnaInCommon}% DNA in common`;
        }
    },
    willLikelySurvive() {
      let isCOrG = 0;
      for(const base of this._dna){
        if(base === 'C' || base === 'G'){
          isCOrG += 1;
        }
      }
      const numOFCG = Math.round((isCOrG / 15) * 100);
      if(numOFCG >= 60) {
        return true;
      } else {
        return false;
      }
    }  
  }
};

let specimensToStudy = [];
let specimanID = 0;

while (specimensToStudy.length < 30) {
  let specimen = pAequorFactory(specimanID, mockUpStrand());
  if(specimen.willLikelySurvive() === true){
    specimensToStudy.push(specimen);
  }
  specimanID += 1;
}

console.log(specimensToStudy);