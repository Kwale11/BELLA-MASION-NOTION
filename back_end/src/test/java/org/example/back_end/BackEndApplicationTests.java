package org.example.back_end;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import java.util.List;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class BackEndApplicationTests {

    private final JavaClasses classes =
            new ClassFileImporter()
                    .withImportOption(
                            new ImportOption.DoNotIncludeTests()
                    )
                    .importPackages("org.example.back_end");

    @Test
    void modulesMustNotAccessOtherModuleInternals() {
        var modules = List.of(
                "catalog",
                "customization",
                "store"
        );

        for (String source : modules) {
            for (String target : modules) {
                if (source.equals(target)) {
                    continue;
                }

                noClasses()
                        .that()
                        .resideInAPackage(
                                "org.example.back_end."
                                        + source
                                        + ".."
                        )
                        .should()
                        .dependOnClassesThat()
                        .resideInAnyPackage(
                                "org.example.back_end."
                                        + target
                                        + ".application..",
                                "org.example.back_end."
                                        + target
                                        + ".domain..",
                                "org.example.back_end."
                                        + target
                                        + ".infrastructure.."
                        )
                        .check(classes);
            }
        }
    }

    @Test
    void domainMustRemainIndependent() {
        noClasses()
                .that()
                .resideInAPackage("..domain..")
                .should()
                .dependOnClassesThat()
                .resideInAnyPackage(
                        "org.springframework..",
                        "java.sql..",
                        "..api..",
                        "..application..",
                        "..infrastructure.."
                )
                .check(classes);
    }

    @Test
    void applicationMustNotDependOnOuterLayers() {
        noClasses()
                .that()
                .resideInAPackage("..application..")
                .should()
                .dependOnClassesThat()
                .resideInAnyPackage(
                        "..api..",
                        "..infrastructure.."
                )
                .check(classes);
    }

    @Test
    void apiMustNotAccessDatabaseDirectly() {
        noClasses()
                .that()
                .resideInAPackage("..api..")
                .should()
                .dependOnClassesThat()
                .resideInAnyPackage(
                        "..infrastructure..",
                        "org.springframework.jdbc.."
                )
                .check(classes);
    }

    @Test
    void sharedMustNotDependOnFeatureModules() {
        noClasses()
                .that()
                .resideInAPackage(
                        "org.example.back_end.shared.."
                )
                .should()
                .dependOnClassesThat()
                .resideInAnyPackage(
                        "org.example.back_end.catalog..",
                        "org.example.back_end.customization..",
                        "org.example.back_end.store.."
                )
                .check(classes);
    }
}