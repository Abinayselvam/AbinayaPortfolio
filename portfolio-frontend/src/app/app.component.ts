import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ContactService } from './services/contact.service';
import { ProjectService } from './services/project.service';
import { GitHubService } from './services/github.service';
import { ContactForm, Project, ApiResponse, Experience, GitHubStats } from './models/contact.model';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  contactForm!: FormGroup;
  projects: Project[] = [];
  featuredProjects: Project[] = [];
  allProjects: Project[] = [];
  isSubmitting = false;
  showAllProjects = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  showToast = false;
  activeSection = 'hero';
  mobileMenuOpen = false;
  isDarkMode = true;

  // --- NEW: GitHub & Experience ---
  githubStats: GitHubStats | null = null;
  githubStatsLoading = true;
  readonly experiences: Experience[] = [
    {
      role: 'Full Stack Developer',
      company: 'Freelance / Personal Projects',
      duration: '2022 - Present',
      description: 'Building scalable web applications for clients using Angular and .NET. Implementing clean architecture, RESTful APIs, and responsive UI/UX designs.',
      tech: ['Angular', '.NET 8', 'SQL Server', 'Tailwind CSS']
    },
    {
      role: 'Frontend Developer Intern',
      company: 'Tech Startup (Replace with real)',
      duration: '2021 - 2022',
      description: 'Developed interactive user interfaces and consumed REST APIs. Improved page load speed by 40% through lazy loading and code splitting.',
      tech: ['Angular', 'TypeScript', 'RxJS', 'SCSS']
    }
  ];

  // --- NEW: Typewriter ---
  readonly titles = ['Full Stack Developer', 'Angular Specialist', '.NET Engineer', 'UI/UX Enthusiast'];
  displayTitle = '';
  titleIndex = 0;
  charIndex = 0;
  isDeleting = false;

  readonly personalInfo = {
    name: 'Abinaya S',
    title: 'Full Stack Developer',
    tagline: 'I build exceptional digital experiences with Angular & .NET',
    description: 'Passionate full-stack developer with 3+ years of experience crafting scalable web applications. I specialize in building performant, accessible, and beautiful products that solve real problems.',
    email: 'sabinaya352@gmail.com',
    phone: '+91 91591 29576',
    location: 'Cuddalore, Tamilnadu',
    github: 'https://github.com/Abinayselvam',
    linkedin: 'https://www.linkedin.com/in/abinayaselvam2002/',
    resumeUrl: '#'
  };

  readonly aboutCodeSnippet = `const developer = {
  name: '${'Abinaya S'}',
  role: '${'Full Stack Developer'}',
  location: '${'Cuddalore, Tamilnadu'}',
  passion: 'Building things that matter',
  available: true,
  coffee: Infinity
};`;
  readonly currentYear = new Date().getFullYear();

  readonly skills = [
    { name: 'Angular', level: 92, category: 'frontend' },
    { name: 'TypeScript', level: 88, category: 'frontend' },
    { name: 'HTML/CSS/Tailwind', level: 95, category: 'frontend' },
    { name: 'RxJS', level: 80, category: 'frontend' },
    { name: '.NET Core / .NET 8', level: 90, category: 'backend' },
    { name: 'C#', level: 88, category: 'backend' },
    { name: 'Entity Framework', level: 85, category: 'backend' },
    { name: 'SQL Server / PostgreSQL', level: 82, category: 'backend' },
    { name: 'SignalR', level: 78, category: 'backend' },
    { name: 'REST API Design', level: 90, category: 'backend' },
    { name: 'Git & GitHub', level: 88, category: 'tools' },
    { name: 'Docker', level: 72, category: 'tools' },
    { name: 'Azure / AWS', level: 68, category: 'tools' },
    { name: 'CI/CD Pipelines', level: 75, category: 'tools' }
  ];

  readonly navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' }, // NEW
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];
  constructor(
    private fb: FormBuilder,
    private http: HttpClient, // <--- ADD THIS LINE
    private contactService: ContactService,
    private projectService: ProjectService,
    private githubService: GitHubService
  ) {}

    ngOnInit(): void {
    this.initForm();
    this.loadProjects();
    this.loadGitHubStats();
    this.typewriterEffect();
    this.applyTheme(this.getPreferredTheme());
  }

  ngAfterViewInit(): void {
    this.initScrollAnimations();
    this.initScrollSpy();
  }

  // --- NEW: Typewriter Logic ---
  typewriterEffect(): void {
    const current = this.titles[this.titleIndex];
    if (this.isDeleting) {
      this.displayTitle = current.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.displayTitle = current.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let speed = this.isDeleting ? 50 : 100;

    if (!this.isDeleting && this.charIndex === current.length) {
      speed = 2000; // Pause at end
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.titleIndex = (this.titleIndex + 1) % this.titles.length;
      speed = 500; // Pause before next word
    }

    setTimeout(() => this.typewriterEffect(), speed);
  }


  // --- NEW: Theme Toggle ---
  private getPreferredTheme(): 'dark' | 'light' {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  get nameInitials(): string {
  return this.personalInfo.name.split(' ').map(n => n[0]).join('');
}
  

  private applyTheme(theme: 'dark' | 'light'): void {
    this.isDarkMode = theme === 'dark';
    document.body.classList.toggle('light-theme', !this.isDarkMode);
    document.body.classList.toggle('dark-theme', this.isDarkMode);
    localStorage.setItem('theme', theme);
  }

  toggleTheme(setToDark?: boolean): void {
    const nextTheme = setToDark !== undefined ? setToDark : !this.isDarkMode;
    this.applyTheme(nextTheme ? 'dark' : 'light');
  }

  // --- NEW: GitHub Stats ---
  loadGitHubStats(): void {
    this.githubStatsLoading = true;
    this.githubService.getStats().subscribe({
      next: (data) => {
        this.githubStats = data;
        this.githubStatsLoading = false;
      },
      error: () => {
        this.githubStats = null;
        this.githubStatsLoading = false;
        console.log('Could not load GitHub stats');
      }
    });
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
    });
  }

  private loadProjects(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
      this.featuredProjects = projects.filter((project) => project.featured);
      this.allProjects = projects;
    });
  }

  get name(): AbstractControl { return this.contactForm.get('name')!; }
  get email(): AbstractControl { return this.contactForm.get('email')!; }
  get subject(): AbstractControl { return this.contactForm.get('subject')!; }
  get message(): AbstractControl { return this.contactForm.get('message')!; }

  getSkillsByCategory(category: string) { return this.skills.filter(s => s.category === category); }

  getErrorMessage(control: AbstractControl, fieldName: string): string {
    if (control.hasError('required')) {
      return `${fieldName} is required.`;
    }

    if (control.hasError('email')) {
      return 'Please enter a valid email address.';
    }

    if (control.hasError('minlength')) {
      return `${fieldName} must be at least ${control.errors?.['minlength'].requiredLength} characters.`;
    }

    if (control.hasError('maxlength')) {
      return `${fieldName} must be at most ${control.errors?.['maxlength'].requiredLength} characters.`;
    }

    return '';
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formValue: ContactForm = this.contactForm.value;

    this.contactService.sendContactForm(formValue).subscribe({
      next: () => {
        this.displayToast('Message sent successfully!', 'success');
        this.contactForm.reset();
        this.isSubmitting = false;
      },
      error: () => {
        this.displayToast('Something went wrong. Please try again.', 'error');
        this.isSubmitting = false;
      }
    });
  }

  private markAllAsTouched(): void {
    this.contactForm.markAllAsTouched();
  }

  private displayToast(msg: string, type: 'success' | 'error'): void {
    this.toastMessage = msg;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }

  toggleProjects(): void { this.showAllProjects = !this.showAllProjects; }
  scrollTo(sectionId: string): void { document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' }); }
  private initScrollAnimations(): void {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('.scroll-reveal'));
    revealElements.forEach((element, index) => {
      requestAnimationFrame(() => {
        window.setTimeout(() => element.classList.add('animate-in'), index * 80);
      });
    });
  }

  private initScrollSpy(): void {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
        }
      });
    }, { threshold: 0.3 });

    sections.forEach((section) => observer.observe(section));
  }

  openLink(url: string): void { window.open(url, '_blank', 'noopener,noreferrer'); }
}