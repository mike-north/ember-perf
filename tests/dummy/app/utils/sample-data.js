
let counts = {
  company: 1,
  building: 1
};

export let BUILDINGS = [];
export let COMPANIES = [];

function building(name) {
  let b = { name, id: counts.building++, companyId: this.company.id };
  BUILDINGS.push(b);
  this.company.buildings.push(b.id);
}

function company(name, cb) {
  let c = { name, buildings: [], id: counts.company++ };
  COMPANIES.push(c);
  let ctxt = {
    company: c
  };
  ctxt.building = building.bind(ctxt);
  cb.apply(ctxt);
}

company('Yahoo', function() {
  this.building(`Yahoo - Building A`);
  this.building(`Yahoo - Building B`);
  this.building(`Yahoo - Building C`);
  this.building(`Yahoo - Building D`);
});

company('Flurry', function() {
  this.building(`Flurry HQ`);
});

company('Tumblr', function() {
  this.building(`Tumblr HQ`);
});
