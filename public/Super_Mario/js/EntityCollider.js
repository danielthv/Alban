export default class EntityCollider {
  constructor(entites) {
    this.entites = entites;
  }

  check(subject) {
    this.entites.forEach(candidate => {
      if (subject === candidate) {
        return;
      }

      if (subject.bounds.overlaps(candidate.bounds)) {
        subject.collides(candidate);
        candidate.collides(subject);
      }

    });
  }
}