describe('services test', function() {
    var $httpBackend;
    beforeEach(module('services'));
    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get("$httpBackend");
        $httpBackend.when("GET", "http://localhost:3000/api/projets").respond(200, [
            {"id ": "0", "projet": "projet 0", "client": "client", "datedebut": "01-01-2013", "datefin": "10-09-2013"},
            {"id ": "1", "projet": "projet 1", "client": "client1", "datedebut": "01-01-2013", "datefin": "10-09-2013"}]);
    }));

    afterEach(function() {
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('ProjectService', function() {
        it('result should be "2 project"', inject(function(Project) {

            Project.getProjects().success(function(response) {
                expect(response.length).toBe(2);
            }).error(function(response) {
                expect(false).toBe(true);
            });
        }));
    });
});

// employe service

describe('Employe test', function() {
    var $httpBackend;
    beforeEach(module('services'));
    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get("$httpBackend");
        $httpBackend.when("GET", "http://localhost:3000/api/employes").respond(200, [
            {"id": "0", "nom": "DUPONT", "prenom": "Christophe", "fonction": "Chef de projet", "client": "AXA", "date": "2012-04-01"},
            {"id": "1", "nom": "Nom", "prenom": "prenom1", "fonction": "Chef de projet", "client": "AXA", "date": "2012-04-01"},
            {"id": "2", "nom": "Nom1", "prenom": "Pre1", "fonction": "COM", "client": "", "date": "2012-04-01"},
            {"id": "3", "nom": "NOM2", "prenom": "Pre1", "fonction": "ING", "client": "la poste", "date": "2012-04-01"}]);
    }));

    afterEach(function() {
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('ProjectService', function() {
        it('result should be "4 employes"', inject(function(Employe) {

            Employe.getList().success(function(response) {
                expect(response.length).toBe(4);
            }).error(function(response) {
                expect(false).toBe(true);
            });
        }));
    });
});