describe('rechercher emloyes', function() {
 beforeEach(function() {
 browser().navigateTo('http://localhost:8080/ebiznext/employes');
 });
 it('should filter results', function() {
 input('filterId').enter('chris');
  });
});