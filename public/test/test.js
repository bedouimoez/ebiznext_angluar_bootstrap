describe('rechercher emloyes', function() {
 beforeEach(function() {
 browser().navigateTo('http://localhost:3000/employes');
 });
 it('should filter results', function() {
 input('filterId').enter('chris');
  });
});