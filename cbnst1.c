#include <stdio.h>

// Function defining the ODE dy/dx = f(x, y)
double f(double x, double y) {
    return x + y; // Example: dy/dx = x + y
}

void euler(double x0, double y0, double h, int n) {
    double x = x0, y = y0;
    printf("Step\t  x\t       y\n");
    printf("---------------------------\n");
    printf("0\t%.4lf\t%.4lf\n", x, y);
    
    for (int i = 1; i <= n; i++) {
        y = y + h * f(x, y);
        x = x + h;
        printf("%d\t%.4lf\t%.4lf\n", i, x, y);
    }
}

int main() {
    double x0, y0, h;
    int n;
    printf("Enter initial value of x (x0): ");
    scanf("%lf", &x0);
    printf("Enter initial value of y (y0): ");
    scanf("%lf", &y0);
    printf("Enter step size (h): ");
    scanf("%lf", &h);
    printf("Enter number of steps (n): ");
    scanf("%d", &n);

    euler(x0, y0, h, n);
    return 0;
}
